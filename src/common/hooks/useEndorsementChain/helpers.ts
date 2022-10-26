import { Provider } from "@ethersproject/abstract-provider";
import {
  EndorsementChain,
  TransferBaseEvent,
  TransferEvent,
  TransferEventType,
  TokenTransferEvent,
} from "../../../types";

export const extractEscrowAddress = (tokenLogs: TokenTransferEvent[]): string => {
  if (tokenLogs.length === 0) {
    throw new Error("Unminted Title Escrow");
  }
  sortLogChain(tokenLogs);
  const escrowAddress = tokenLogs.at(0)?.to || "";
  if (!escrowAddress) {
    throw new Error("Unable to retrieve Title Escrow Address");
  }
  return escrowAddress;
};

export const fetchEventTime = async (blockNumber: number, provider: Provider): Promise<number> => {
  const eventTimestamp = (await (await provider.getBlock(blockNumber)).timestamp) * 1000;
  return eventTimestamp;
};

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
        type = "TRANSFER_OWNERS";
        break;
      case 3:
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
      historyChain.push(transactionDetails);
      previousHolder = transactionDetails.holder;
      previousBeneficiary = transactionDetails.owner;
    } else if (log.type === "SURRENDER_ACCEPTED") {
      previousHolder = "";
      previousBeneficiary = "";
      historyChain.push(transactionDetails);
    } else if (log.type === "SURRENDERED" || log.type === "SURRENDER_REJECTED") {
      historyChain.push(transactionDetails);
    } else {
      historyChain.push(transactionDetails);
    }
  }
  return historyChain;
};

const sortLogChain = (logChain: TransferBaseEvent[]): TransferBaseEvent[] => {
  return logChain.sort((a, b) => {
    return a.blockNumber - b.blockNumber;
  });
};
