import { Provider } from "@ethersproject/abstract-provider";
import { Dictionary, groupBy } from "lodash";
import { TransferBaseEvent, TransferEventType } from "../../../types";

export const fetchEventTime = async (blockNumber: number, provider: Provider): Promise<number> => {
  const msecToSec = 1000;
  const eventTimestamp = (await provider.getBlock(blockNumber)).timestamp * msecToSec;
  return eventTimestamp;
};

/*
  Get available owner/holder from list of events
*/
export const getHolderOwner = (events: TransferBaseEvent[]): { owner: string; holder: string } => {
  let owner = "";
  let holder = "";
  for (const event of events) {
    owner = event.owner || owner;
    holder = event.holder || holder;
  }
  return { owner, holder };
};

export const mergeTransfers = (transferEvents: TransferBaseEvent[]): TransferBaseEvent[] => {
  const groupedEventsDict: Dictionary<TransferBaseEvent[]> = groupBy(transferEvents, "transactionHash");
  const transactionHashValues = Object.values(groupedEventsDict);
  const mergedTransaction = transactionHashValues.flatMap((groupedEvents) => {
    if (groupedEvents.length === 1) return groupedEvents;
    if (groupedEvents.length > 1) {
      const { owner, holder } = getHolderOwner(groupedEvents);
      const base = groupedEvents[0];
      const type = identifyEventTypeFromLogs(groupedEvents);
      return [{ ...base, owner, holder, type }];
    }

    throw new Error("Invalid hash, update your configuration");
  });
  return mergedTransaction;
};

const identifyEventTypeFromLogs = (groupedEvents: TransferBaseEvent[]): TransferEventType => {
  for (const event of groupedEvents) {
    if (
      ["INITIAL", "RETURNED_TO_ISSUER", "RETURN_TO_ISSUER_ACCEPTED", "RETURN_TO_ISSUER_REJECTED"].includes(
        event.type
      ) ||
      event.type.startsWith("REJECT_")
    ) {
      return event.type;
    }
  }

  const isTransferHolder = groupedEvents.some((event) => event.type === "TRANSFER_HOLDER");
  const isTransferBeneficiary = groupedEvents.some((event) => event.type === "TRANSFER_BENEFICIARY");

  if (isTransferHolder && isTransferBeneficiary) {
    return "TRANSFER_OWNERS";
  } else if (isTransferHolder) {
    return "TRANSFER_HOLDER";
  } else if (isTransferBeneficiary) {
    return "TRANSFER_BENEFICIARY";
  }

  throw new Error("Unable to identify event type");
};

/*
  Sort based on blockNumber
*/
export const sortLogChain = (logChain: TransferBaseEvent[]): TransferBaseEvent[] => {
  return logChain.sort((a, b) => {
    return a.blockNumber - b.blockNumber;
  });
};
