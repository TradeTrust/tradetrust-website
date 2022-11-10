import { Provider } from "@ethersproject/abstract-provider";
import {
  EndorsementChain,
  TransferBaseEvent,
  TransferEvent,
  TransferEventType,
  TokenTransferEvent,
} from "../../../types";

/*
  Get Title Escrow address based on minting transaction
  minting transaction will be the first transaction
  token will be issued to the title escrow address
*/
export const extractEscrowAddress = (tokenLogs: TokenTransferEvent[]): string => {
  if (tokenLogs.length === 0) {
    throw new Error("Unminted Title Escrow");
  }
  sortLogChain(tokenLogs);
  const escrowAddress = tokenLogs[0]?.to || "";
  if (!escrowAddress) {
    throw new Error("Unable to retrieve Title Escrow Address");
  }
  return escrowAddress;
};

export const fetchEventTime = async (blockNumber: number, provider: Provider): Promise<number> => {
  const eventTimestamp = (await (await provider.getBlock(blockNumber)).timestamp) * 1000;
  return eventTimestamp;
};

/*
  Get available owner/holder from list of events
*/
export const mergeTransferTransactions = (repeatedTransferEvents: TransferBaseEvent[]): TransferBaseEvent => {
  let owner = "";
  let holder = "";
  for (const event of repeatedTransferEvents) {
    owner = event.owner || owner;
    holder = event.owner || holder;
  }
  return {
    ...repeatedTransferEvents[0],
    owner: owner,
    holder: holder,
  };
};

/*
    Merge Transactions with the same transaction hash
    E.g. 
    TRANSFER_OWNERS that emits: both 
    HOLDER_TRANSFER and OWNER_TRANSFER (on Title Escrow)
    
    INITIAL (Minting) that emits: 
    (TRANSFER_OWNERS as above) and INITIAL (on Token Registry)
    
    SURRENDER_ACCEPTED (Shred) that emits: 
    (TRANSFER_OWNERS as above) and SURRENDER_ACCEPTED (on Token Registry)
*/
export const mergeTransfers = (transferEvents: TransferBaseEvent[]): TransferBaseEvent[] => {
  const hashList: Record<string, number[]> = {};
  const repeatedHash: Set<string> = new Set();
  for (let i = 0; i < transferEvents.length; i++) {
    const transactionHash: string = transferEvents[i].transactionHash;
    if (hashList[transactionHash] === undefined) {
      hashList[transactionHash] = [i];
    } else {
      hashList[transactionHash].push(i);
      repeatedHash.add(transactionHash);
    }
  }

  const mergedEscrowTransfers: TransferBaseEvent[] = [];

  for (const hash of Array.from(repeatedHash)) {
    const length = hashList[hash].length;
    const repeatedTransfers: TransferBaseEvent[] = [];
    for (const index in hashList[hash]) {
      repeatedTransfers.push(transferEvents[hashList[hash][index]]);
    }
    let type: TransferEventType = "INITIAL";
    switch (length) {
      case 2:
        // 2 Repeated Transaction - Same Transaction Hash, Transaction Index && Block Number
        // TitleEscrow: change_owner, change_holder
        type = "TRANSFER_OWNERS";
        break;
      case 3:
        // 3 Repeated Transaction - Same Transaction Hash, Transaction Index && Block Number
        // Token-Registry: Initial
        // TitleEscrow: change_owner, change_holder

        // 3 Repeated Transaction - Same Transaction Hash, Transaction Index && Block Number
        // Token-Registry: surrender_accepted - shred
        // TitleEscrow: change_owner to 0x0, change_holder to 0x0
        for (let i = 0; i < length; i++) {
          if (repeatedTransfers[i].type === "INITIAL" || repeatedTransfers[i].type === "SURRENDER_ACCEPTED") {
            type = repeatedTransfers[i].type;
          }
        }
        break;
      case 0:
      case 1:
      default:
        throw new Error("Invalid repeated hash, update your configuration");
    }
    const mergedTransaction = mergeTransferTransactions(repeatedTransfers);
    mergedEscrowTransfers.push({
      ...mergedTransaction,
      type,
    } as TransferBaseEvent);
  }
  transferEvents = transferEvents.filter((x) => !repeatedHash.has(x.transactionHash));
  return [...transferEvents, ...mergedEscrowTransfers];
};

/*
  Adds details of previous records (Previous Beneficiary/Holder)
  to current events history
*/
export const getEndorsementChain = async (
  provider: Provider,
  logChain: TransferBaseEvent[]
): Promise<EndorsementChain> => {
  const historyChain: EndorsementChain = [];
  sortLogChain(logChain);
  let previousBeneficiary = "";
  let previousHolder = "";

  for (const log of logChain) {
    const timestamp = await fetchEventTime(log.blockNumber, provider);
    const transactionDetails = {
      type: log.type,
      transactionHash: log.transactionHash,
      transactionIndex: log.transactionIndex,
      blockNumber: log.blockNumber,
      owner: log.owner || previousBeneficiary || "",
      holder: log.holder || previousHolder || "",
      timestamp: timestamp,
    } as TransferEvent;

    if (
      log.type === "TRANSFER_OWNERS" ||
      log.type === "TRANSFER_BENEFICIARY" ||
      log.type === "TRANSFER_HOLDER" ||
      log.type === "INITIAL"
    ) {
      // Owner/Holder change
      historyChain.push(transactionDetails);
      previousHolder = transactionDetails.holder;
      previousBeneficiary = transactionDetails.owner;
    } else if (log.type === "SURRENDER_ACCEPTED") {
      // Title Escrow Voided
      previousHolder = "";
      previousBeneficiary = "";
      historyChain.push(transactionDetails);
    } else if (log.type === "SURRENDERED" || log.type === "SURRENDER_REJECTED") {
      // No state changes, except document owner
      historyChain.push(transactionDetails);
    } else {
      // No state changes
      historyChain.push(transactionDetails);
    }
  }
  return historyChain;
};
/*
  Sort based on blockNumber
*/
const sortLogChain = (logChain: TransferBaseEvent[]): TransferBaseEvent[] => {
  return logChain.sort((a, b) => {
    return a.blockNumber - b.blockNumber;
  });
};
