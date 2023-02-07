import { Provider } from "@ethersproject/abstract-provider";
import { TitleEscrowFactory__factory, TradeTrustToken } from "@govtechsg/token-registry/dist/contracts";
import { Signer } from "ethers";
import { TransferBaseEvent, TransferEventType } from "../../../types";

export const fetchEventTime = async (blockNumber: number, provider: Provider): Promise<number> => {
  const msecToSec = 1000;
  const eventTimestamp = (await (await provider.getBlock(blockNumber)).timestamp) * msecToSec;
  return eventTimestamp;
};

export const extractTitleEscrowAddress = async (
  tokenRegistry: TradeTrustToken,
  tokenId: string,
  signer: Provider | Signer
): Promise<string> => {
  const titleEscrowFactoryAddress = await tokenRegistry.titleEscrowFactory();
  const tokenRegistryAddress = await tokenRegistry.address;
  const titleEscrowFactory = TitleEscrowFactory__factory.connect(titleEscrowFactoryAddress, signer);
  const titleEscrowAddress = await titleEscrowFactory.getAddress(tokenRegistryAddress, tokenId);
  return titleEscrowAddress;
};

/*
  Get available owner/holder from list of events
*/
export const mergeDuplicatedTransactions = (repeatedTransferEvents: TransferBaseEvent[]): TransferBaseEvent => {
  let owner = "";
  let holder = "";
  for (const event of repeatedTransferEvents) {
    owner = event.owner || owner;
    holder = event.owner || holder;
  }
  return {
    ...repeatedTransferEvents[0],
    owner,
    holder,
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
    let eventType: TransferEventType = "INITIAL";
    switch (length) {
      case 2:
        // 2 Repeated Transaction - Same Transaction Hash, Transaction Index && Block Number
        // TitleEscrow: change_owner, change_holder
        eventType = "TRANSFER_OWNERS";
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
            eventType = repeatedTransfers[i].type;
          }
        }
        break;
      case 0:
      case 1:
      default:
        throw new Error("Invalid repeated hash, update your configuration");
    }
    const mergedTransaction = mergeDuplicatedTransactions(repeatedTransfers);
    mergedEscrowTransfers.push({
      ...mergedTransaction,
      type: eventType,
    } as TransferBaseEvent);
  }
  transferEvents = transferEvents.filter((x) => !repeatedHash.has(x.transactionHash));
  return [...transferEvents, ...mergedEscrowTransfers];
};
/*
  Sort based on blockNumber
*/
export const sortLogChain = (logChain: TransferBaseEvent[]): TransferBaseEvent[] => {
  return logChain.sort((a, b) => {
    return a.blockNumber - b.blockNumber;
  });
};
