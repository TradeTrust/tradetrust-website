import { TitleEscrow, TitleEscrow__factory } from "@tradetrust-tt/token-registry/contracts";
import { EventFilter, providers } from "ethers";
import { EventFragment, Result } from "ethers/lib/utils";
import {
  TitleEscrowTransferEvent,
  TokenTransferEvent,
  TokenTransferEventType,
  TransferBaseEvent,
} from "../../../types";

export const fetchEscrowTransfersV5 = async (
  provider: providers.Provider,
  address: string
): Promise<TransferBaseEvent[]> => {
  const titleEscrowContract = TitleEscrow__factory.connect(address, provider);
  const holderChangeLogsDeferred = await fetchAllTransfers(titleEscrowContract, provider);
  return holderChangeLogsDeferred;
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
    titleEscrowContract.filters.ReturnToIssuer(null, null),
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
          from: type === "INITIAL" ? "0x0000000000000000000000000000000000000000" : tokenRegistryAddress,
          to: titleEscrowContract.address,
          blockNumber: event.blockNumber,
          transactionHash: event.transactionHash,
          transactionIndex: event.transactionIndex,
          remark: event.args?.remark,
        } as TokenTransferEvent;
      } else if (event?.name === "ReturnToIssuer") {
        return {
          type: "RETURNED_TO_ISSUER",
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
          type: "RETURN_TO_ISSUER_ACCEPTED",
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
    return "RETURN_TO_ISSUER_REJECTED";
  }
}
