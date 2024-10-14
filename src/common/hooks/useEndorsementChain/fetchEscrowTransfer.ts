import { TitleEscrow, TitleEscrow__factory } from "@tradetrust-tt/token-registry/contracts";
import { EventFilter, providers } from "ethers";
import { EventFragment, Result } from "ethers/lib/utils";
import {
  TitleEscrowTransferEvent,
  TokenTransferEvent,
  TokenTransferEventType,
  TransferBaseEvent,
} from "../../../types";
import { TitleEscrowInterface } from "../../contexts/TokenInformationContext";

// TODO: HAN Remove V5 Token Registry function
export const fetchEscrowTransfers = async (
  provider: providers.Provider,
  address: string
): Promise<TitleEscrowTransferEvent[]> => {
  const titleEscrowContract = TitleEscrow__factory.connect(address, provider);
  const isTitleEscrow = await titleEscrowContract.supportsInterface(TitleEscrowInterface.V4);
  if (!isTitleEscrow) throw new Error(`Contract ${address} is not a title escrow contract`);
  // https://ethereum.stackexchange.com/questions/109326/combine-multiple-event-filters-in-ethersjs
  const holderChangeLogsDeferred = fetchHolderTransfers(titleEscrowContract, provider);
  const ownerChangeLogsDeferred = fetchOwnerTransfers(titleEscrowContract, provider);
  const [holderChangeLogs, ownerChangeLogs] = await Promise.all([holderChangeLogsDeferred, ownerChangeLogsDeferred]);
  return [...holderChangeLogs, ...ownerChangeLogs];
};

export const fetchEscrowTransfersV5 = async (
  provider: providers.Provider,
  address: string
): Promise<TransferBaseEvent[]> => {
  const titleEscrowContract = TitleEscrow__factory.connect(address, provider);
  const holderChangeLogsDeferred = await fetchAllTransfers(titleEscrowContract, provider);
  return holderChangeLogsDeferred;
};

/*
  Retrieve all events that emits BENEFICIARY_TRANSFER 
*/
export const fetchOwnerTransfers = async (
  titleEscrowContract: TitleEscrow,
  provider: providers.Provider
): Promise<TitleEscrowTransferEvent[]> => {
  const ownerChangeFilter = titleEscrowContract.filters.BeneficiaryTransfer(null, null);
  const ownerChangeLogs = await provider.getLogs({ ...ownerChangeFilter, fromBlock: 0 });

  const ownerChangeLogsParsed = getParsedLogs(ownerChangeLogs, titleEscrowContract);
  return ownerChangeLogsParsed.map((event) => ({
    type: "TRANSFER_BENEFICIARY",
    owner: event.args.toBeneficiary,
    blockNumber: event.blockNumber,
    transactionHash: event.transactionHash,
    transactionIndex: event.transactionIndex,
  }));
};

interface ParsedLog {
  eventFragment: EventFragment;
  name: string;
  signature: string;
  topic: string;
  args: Result;
  blockNumber: number;
  blockHash: string;
  transactionIndex: number;
  removed: boolean;
  logIndex: number;
  transactionHash: string;
  address: string;
  data: string;
}

export const getParsedLogs = (logs: providers.Log[], titleEscrow: TitleEscrow): ParsedLog[] => {
  return logs.map((log) => {
    if (!log.blockNumber) throw new Error("Block number not present");
    return {
      ...log,
      ...titleEscrow.interface.parseLog(log),
    };
  });
};

/*
  Retrieve all events that emits HOLDER_TRANSFER 
*/
export const fetchHolderTransfers = async (
  titleEscrowContract: TitleEscrow,
  provider: providers.Provider
): Promise<TitleEscrowTransferEvent[]> => {
  const holderChangeFilter = titleEscrowContract.filters.HolderTransfer(null, null);
  const holderChangeLogs = await provider.getLogs({ ...holderChangeFilter, fromBlock: 0 });
  const holderChangeLogsParsed = getParsedLogs(holderChangeLogs, titleEscrowContract);
  return holderChangeLogsParsed.map((event) => ({
    type: "TRANSFER_HOLDER",
    blockNumber: event.blockNumber,
    holder: event.args.toHolder,
    transactionHash: event.transactionHash,
    transactionIndex: event.transactionIndex,
  }));
};

/*
  Retrieve all V5 events 
*/
export const fetchAllTransfers = async (
  titleEscrowContract: TitleEscrow,
  provider: providers.Provider
): Promise<(TitleEscrowTransferEvent | TokenTransferEvent)[]> => {
  const allFilters: EventFilter[] = [
    titleEscrowContract.filters.HolderTransfer(null, null),
    titleEscrowContract.filters.BeneficiaryTransfer(null, null),
    titleEscrowContract.filters.TokenReceived(null, null, null),
    titleEscrowContract.filters.Surrender(null, null),
    // titleEscrowContract.filters.Nomination(null, null),
    titleEscrowContract.filters.RejectTransferOwners(null, null),
    titleEscrowContract.filters.RejectTransferBeneficiary(null, null),
    titleEscrowContract.filters.RejectTransferHolder(null, null),
    titleEscrowContract.filters.Shred(null, null),
  ];
  const allLogs = await Promise.all(
    allFilters.map(async (filter) => {
      const logs = await provider.getLogs({ ...filter, fromBlock: 0 });
      return logs;
    })
  );

  const holderChangeLogsParsed = getParsedLogs(allLogs.flat(), titleEscrowContract);

  const tokenRegistryAddress: string = await titleEscrowContract.registry();

  return holderChangeLogsParsed
    .map((event) => {
      if (event?.name === "HolderTransfer") {
        return {
          type: "TRANSFER_HOLDER",
          blockNumber: event.blockNumber,
          holder: event.args.toHolder,
          transactionHash: event.transactionHash,
          transactionIndex: event.transactionIndex,
          remark: event.args?.remark,
        } as TitleEscrowTransferEvent;
      } else if (event?.name === "BeneficiaryTransfer") {
        return {
          type: "TRANSFER_BENEFICIARY",
          owner: event.args.toBeneficiary,
          blockNumber: event.blockNumber,
          transactionHash: event.transactionHash,
          transactionIndex: event.transactionIndex,
          remark: event.args?.remark,
        } as TitleEscrowTransferEvent;
      } else if (event?.name === "TokenReceived") {
        // MINT / RESTORE
        const type = identifyTokenReceivedType(event);
        return {
          type,
          from: type === "INITIAL" ? "0x0000000000000000000000000000000000000000" : tokenRegistryAddress, //event.args.from as string,
          to: titleEscrowContract.address,
          blockNumber: event.blockNumber,
          transactionHash: event.transactionHash,
          transactionIndex: event.transactionIndex,
          remark: event.args?.remark,
        } as TokenTransferEvent;
      } else if (event?.name === "Surrender") {
        return {
          type: "SURRENDERED",
          blockNumber: event.blockNumber,
          from: titleEscrowContract.address,
          to: tokenRegistryAddress,
          transactionHash: event.transactionHash,
          transactionIndex: event.transactionIndex,
          remark: event.args?.remark,
        } as TokenTransferEvent;
        // } else if (event?.name === "Nomination") {
        //   return {
        //   } as TitleEscrowTransferEvent
      } else if (event?.name === "RejectTransferOwners") {
        return {
          type: "REJECT_TRANSFER_OWNERS",
          blockNumber: event.blockNumber,
          transactionHash: event.transactionHash,
          transactionIndex: event.transactionIndex,
          remark: event.args?.remark,
        } as TitleEscrowTransferEvent;
      } else if (event?.name === "RejectTransferBeneficiary") {
        return {
          type: "REJECT_TRANSFER_BENEFICIARY",
          blockNumber: event.blockNumber,
          transactionHash: event.transactionHash,
          transactionIndex: event.transactionIndex,
          remark: event.args?.remark,
        } as TitleEscrowTransferEvent;
      } else if (event?.name === "RejectTransferHolder") {
        return {
          type: "REJECT_TRANSFER_HOLDER",
          blockNumber: event.blockNumber,
          transactionHash: event.transactionHash,
          transactionIndex: event.transactionIndex,
          remark: event.args?.remark,
        } as TitleEscrowTransferEvent;
      } else if (event?.name === "Shred") {
        return {
          type: "SURRENDER_ACCEPTED",
          blockNumber: event.blockNumber,
          from: tokenRegistryAddress,
          to: "0x00000000000000000000000000000000000dead",
          transactionHash: event.transactionHash,
          transactionIndex: event.transactionIndex,
          remark: event.args?.remark,
        } as TokenTransferEvent;
      }

      return {} as TokenTransferEvent;
    })
    .filter((event) => event !== undefined);
};

export function identifyTokenReceivedType(event: ParsedLog): TokenTransferEventType {
  if (event.args.isMinting) {
    return "INITIAL";
  } else {
    return "SURRENDER_REJECTED";
  }
}
