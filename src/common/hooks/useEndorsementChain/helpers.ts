import { TradeTrustERC721 } from "@govtechsg/token-registry/dist/contracts";
import { Provider } from "@ethersproject/abstract-provider";
import {
  EndorsementChain,
  TransferBaseEvent,
  TransferEvent,
  TokenTransferEventType,
  TitleEscrowTransferEventType,
  TitleEscrowTransferEvent,
  TransferEventType,
} from "../../../types";

export const fetchEscrowAddress = async (tokenRegistry: TradeTrustERC721, tokenId: string): Promise<string> => {
  const titleEscrowAddress = tokenRegistry.ownerOf(tokenId);
  return await titleEscrowAddress;
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
  console.log(transferEvents);
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

  for (const hash in Array.from(repeatedHash)) {
    console.log(hash);
    const length = hashList[hash].length;
    const repeatedTransfers: TransferBaseEvent[] = [];
    for (const index in hashList[hash]) {
      repeatedTransfers.push(transferEvents[index]);
    }
    let type: TransferEventType = "INITIAL";
    switch (length) {
      case 2:
        type = "TRANSFER_OWNERS";
        break;
      case 3:
        type = "INITIAL";
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
    console.log({
      ...mergedTransaction,
      type,
    } as TransferBaseEvent);
  }

  transferEvents = transferEvents.filter((x) => !repeatedHash.has(x.transactionHash));

  console.log(transferEvents);
  console.log(mergedEscrowTransfers);

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

    if (log.type === "TRANSFER_OWNERS" || log.type === "TRANSFER_BENEFICIARY" || log.type === "TRANSFER_HOLDER") {
      historyChain.push(transactionDetails);
      previousHolder = transactionDetails.holder;
      previousBeneficiary = transactionDetails.owner;
    } else if (log.type === "SURRENDER_ACCEPTED") {
      previousHolder = "";
      previousBeneficiary = "";
      historyChain.push(transactionDetails);
    } else if (log.type === "SURRENDER_REJECTED") {
    } else if (log.type === "SURRENDERED" || log.type === "INITIAL") {
      historyChain.push(transactionDetails);
    }
    historyChain.push(transactionDetails);
  }
  return historyChain;
};

const sortLogChain = (logChain: TransferBaseEvent[]): TransferBaseEvent[] => {
  return logChain.sort((a, b) => {
    return a.blockNumber! - b.blockNumber!;
  });
};
