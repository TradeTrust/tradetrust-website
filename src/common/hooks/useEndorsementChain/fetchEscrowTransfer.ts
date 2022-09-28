import { providers } from "ethers";
import { TitleEscrow, TitleEscrow__factory } from "@govtechsg/token-registry/contracts";
import { TitleEscrowEvent } from "../../../types";

export const fetchEscrowTransfers = async (
  address: string,
  provider: providers.Provider
): Promise<TitleEscrowEvent[]> => {
  const titleEscrowContract = TitleEscrow__factory.connect(address, provider);
  const isTitleEscrow = await titleEscrowContract.supportsInterface("0x079dff60");
  if (!isTitleEscrow) throw new Error(`Contract ${address} is not a title escrow contract`);
  // https://ethereum.stackexchange.com/questions/109326/combine-multiple-event-filters-in-ethersjs
  const holderChangeLogsDeferred = fetchHolderTransfers(titleEscrowContract, provider);
  const ownerChangeLogsDeferred = fetchOwnerTransfers(titleEscrowContract, provider);
  const [holderChangeLogs, ownerChangeLogs] = await Promise.all([holderChangeLogsDeferred, ownerChangeLogsDeferred]);

  const transferEvents = [...holderChangeLogs, ...ownerChangeLogs];
  mergeChangeOwnersTransfers(transferEvents);

  return transferEvents;
  // {
  //   eventType: "Transfer",
  //   documentOwner: address,
  //   beneficiary,
  //   holderChangeEvents: transferEvents,
  // };
};

const mergeChangeOwnersTransfers = (transferEvents: TitleEscrowEvent[]): TitleEscrowEvent[] => {
  const hashList: Record<string, number[]> = {};
  const repeatedHash = [];
  for (let i = 0; i < transferEvents.length; i++) {
    const transactionHash: string = transferEvents[i].transactionHash;
    if (hashList[transactionHash] === undefined) {
      hashList[transactionHash] = [i];
    } else {
      hashList[transactionHash].push(i);
      repeatedHash.push(transactionHash);
    }
  }
  let removalIndexes: number[] = [];
  repeatedHash.forEach((index) => {
    const indexValues = hashList[index];
    if (indexValues.length !== 2) {
      throw new Error(`Bad Index Value ${indexValues}`);
    }
    const index1 = indexValues[0];
    const index2 = indexValues[1];
    const beneficiary = transferEvents[index1].beneficiary || transferEvents[index2].beneficiary;
    const holder = transferEvents[index1].holder || transferEvents[index2].holder;

    transferEvents.push({
      ...transferEvents[index1],
      beneficiary: beneficiary,
      holder: holder,
    });
    removalIndexes = [...removalIndexes, ...indexValues];
  });

  removalIndexes.sort();
  removalIndexes.reverse();

  removalIndexes.forEach((index) => {
    transferEvents.splice(index, 1);
  });

  return transferEvents;
};

// export interface TradeTrustErc721Event {
//   eventType: TradeTrustErc721EventType;
//   documentOwner: string;
//   eventTimestamp?: number;
// }

// export interface TitleEscrowEvent extends TradeTrustErc721Event {
//   blockNumber: number;
//   holder: string | null;
//   beneficiary: string | null;
//   timestamp: number;
//   transactionHash: string;
// }

export const fetchOwnerTransfers = async (
  titleEscrowContract: TitleEscrow,
  provider: providers.Provider
): Promise<TitleEscrowEvent[]> => {
  const ownerChangeFilter = titleEscrowContract.filters.BeneficiaryTransfer(null, null);
  const ownerChangeLogs = await provider.getLogs({ ...ownerChangeFilter, fromBlock: 0 });

  const ownerChangeLogsParsed = ownerChangeLogs.map((log) => {
    if (!log.blockNumber) throw new Error("Block number not present");
    return {
      ...log,
      ...titleEscrowContract.interface.parseLog(log),
    };
  });
  ownerChangeLogsParsed.forEach((e) => {
    if (!e.blockNumber) throw new Error("");
  });
  const blockTimes = await Promise.all(
    ownerChangeLogsParsed.map(async (event) => {
      return await fetchEventTime(event.blockNumber, provider);
    })
  );

  return ownerChangeLogsParsed.map((event, index) => ({
    eventType: "Transfer",
    documentOwner: event.args["toBeneficiary"] as string,
    blockNumber: event.blockNumber,
    beneficiary: event.args["toBeneficiary"] as string,
    holder: null,
    timestamp: blockTimes[index],
    transactionHash: event.transactionHash,
    transactionIndex: event.transactionIndex,
  }));
};

export const fetchHolderTransfers = async (
  titleEscrowContract: TitleEscrow,
  provider: providers.Provider
): Promise<TitleEscrowEvent[]> => {
  const holderChangeFilter = titleEscrowContract.filters.HolderTransfer(null, null);
  const holderChangeLogs = await provider.getLogs({ ...holderChangeFilter, fromBlock: 0 });

  const holderChangeLogsParsed = holderChangeLogs.map((log) => {
    if (!log.blockNumber) throw new Error("Block number not present");
    return {
      ...log,
      ...titleEscrowContract.interface.parseLog(log),
    };
  });
  holderChangeLogsParsed.forEach((e) => {
    if (!e.blockNumber) throw new Error("");
  });
  const blockTimes = await Promise.all(
    holderChangeLogsParsed.map(async (event) => {
      return await fetchEventTime(event.blockNumber, provider);
    })
  );

  return holderChangeLogsParsed.map((event, index) => ({
    eventType: "Transfer",
    documentOwner: "",
    blockNumber: event.blockNumber,
    holder: event.args["toHolder"] as string,
    beneficiary: null,
    timestamp: blockTimes[index],
    transactionHash: event.transactionHash,
    transactionIndex: event.transactionIndex,
  }));
};

export const fetchEventTime = async (blockNumber: number, provider: providers.Provider): Promise<number> => {
  const eventTimestamp = (await (await provider.getBlock(blockNumber)).timestamp) * 1000;
  return eventTimestamp;
};
