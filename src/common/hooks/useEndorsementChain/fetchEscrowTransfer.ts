import { v5Contracts } from "@trustvc/trustvc";
import { providers } from "ethers";
import { EventFragment, Result } from "ethers/lib/utils";
import {
  TitleEscrowTransferEvent,
  TokenTransferEvent,
  TokenTransferEventType,
  TransferBaseEvent,
} from "../../../types";
const { TitleEscrow__factory } = v5Contracts;
type TitleEscrow = v5Contracts.TitleEscrow;
export const fetchEscrowTransfersV5 = async (
  provider: providers.Provider,
  address: string
): Promise<TransferBaseEvent[]> => {
  const titleEscrowContract = TitleEscrow__factory.connect(address, provider);
  const holderChangeLogsDeferred = await fetchAllTransfers(titleEscrowContract);
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
      ...(titleEscrow.interface as any).parseLog(log),
    };
  });
};

/*
  Retrieve all V5 events 
*/
export const fetchAllTransfers = async (
  titleEscrowContract: TitleEscrow
): Promise<(TitleEscrowTransferEvent | TokenTransferEvent)[]> => {
  const allFilters: any[] = [
    titleEscrowContract.filters.HolderTransfer,
    titleEscrowContract.filters.BeneficiaryTransfer,
    titleEscrowContract.filters.TokenReceived,
    titleEscrowContract.filters.ReturnToIssuer,
    // titleEscrowContract.filters.Nomination,
    titleEscrowContract.filters.RejectTransferOwners,
    titleEscrowContract.filters.RejectTransferBeneficiary,
    titleEscrowContract.filters.RejectTransferHolder,
    titleEscrowContract.filters.Shred,
  ];
  const allLogs: any = await Promise.all(
    allFilters.map(async (filter) => {
      const logs = await titleEscrowContract.queryFilter(filter, 0, "latest");
      // const logs = await titleEscrowContract.queryFilter(filter, 0, "latest");
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
      } else if (event?.name === "Nomination") {
        return undefined;
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

      return undefined;
    })
    .filter((event) => event !== undefined) as (TitleEscrowTransferEvent | TokenTransferEvent)[];
};

export function identifyTokenReceivedType(event: ParsedLog): TokenTransferEventType {
  if (event.args.isMinting) {
    return "INITIAL";
  } else {
    return "RETURN_TO_ISSUER_REJECTED";
  }
}
