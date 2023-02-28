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
    holder = event.owner || holder;
  }
  return { owner, holder };
};

/*
    Merge Transactions with the same transaction hash

    TRANSFER_OWNERS that emits:
    - Title Escrow
      * HOLDER_TRANSFER
      * OWNER_TRANSFER
    
    INITIAL (Minting) that emits:
    - Title Escrow
      * HOLDER_TRANSFER
      * OWNER_TRANSFER
    - Token Registry
      * INITIAL
    

    SURRENDER_ACCEPTED (Shred) that emits:
    - Title Escrow
      * HOLDER_TRANSFER
      * OWNER_TRANSFER
    - Token Registry
      * SURRENDER_ACCEPTED
*/
export const mergeTransfers = (transferEvents: TransferBaseEvent[]): TransferBaseEvent[] => {
  const groupedEventsDict: Dictionary<TransferBaseEvent[]> = groupBy(transferEvents, "transactionHash");
  const transactionHashValues = Object.values(groupedEventsDict);
  const mergedTransaction = transactionHashValues.flatMap((groupedEvents) => {
    if (groupedEvents.length === 1) return groupedEvents;
    if (groupedEvents.length === 2) {
      // 2 Transaction with the same transactionHash, (transactionIndex and blockNumber)
      // Merging HOLDER_TRANSFER and OWNER_TRANSFER transactions
      const type: TransferEventType = "TRANSFER_OWNERS";
      const base: TransferBaseEvent = groupedEvents[0];
      const { owner, holder } = getHolderOwner(groupedEvents);
      return [{ ...base, type, owner, holder }];
    }
    if (groupedEvents.length === 3) {
      // 3 Transaction with the same transactionHash, (transactionIndex and blockNumber)
      // Merging HOLDER_TRANSFER, OWNER_TRANSFER and INITIAL/SURRENDER_ACCEPTED transactions
      // SURRENDER_ACCPTED: changes owner and holder to 0x0
      const base = groupedEvents[0];
      const type: TransferEventType = "INITIAL";
      const { owner, holder } = getHolderOwner(groupedEvents);
      const found = groupedEvents.find((x) => {
        return x.type === "INITIAL" || x.type === "SURRENDER_ACCEPTED";
      });
      return [{ ...base, owner, holder, type: found?.type || type }];
    }
    throw new Error("Invalid hash, update your configuration");
  });
  return mergedTransaction;
};
/*
  Sort based on blockNumber
*/
export const sortLogChain = (logChain: TransferBaseEvent[]): TransferBaseEvent[] => {
  return logChain.sort((a, b) => {
    return a.blockNumber - b.blockNumber;
  });
};
