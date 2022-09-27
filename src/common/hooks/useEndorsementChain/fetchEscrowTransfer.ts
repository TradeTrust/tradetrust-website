import { providers } from "ethers";
import { TitleEscrow, TitleEscrow__factory } from "@govtechsg/token-registry/contracts";
import { HolderChangeEvents, TitleEscrowEvent, TradeTrustErc721Event, TradeTrustErc721EventType } from "../../../types";

export const fetchEscrowTransfers = async (
  address: string,
  provider: providers.Provider
): Promise<TitleEscrowEvent> => {
  const titleEscrowContract = TitleEscrow__factory.connect(address, provider);
  const isTitleEscrow = await titleEscrowContract.supportsInterface("0x079dff60");
  if (!isTitleEscrow) throw new Error(`Contract ${address} is not a title escrow contract`);
  const beneficiaryDeferred = await titleEscrowContract.beneficiary();
  // https://ethereum.stackexchange.com/questions/109326/combine-multiple-event-filters-in-ethersjs
  const holderChangeLogsDeferred = fetchHolderTransfers(titleEscrowContract, provider);
  const ownerChangeLogsDeferred = fetchOwnerTransfers(titleEscrowContract, provider);
  const [beneficiary, holderChangeLogs, ownerChangeLogs] = await Promise.all([
    beneficiaryDeferred,
    holderChangeLogsDeferred,
    ownerChangeLogsDeferred,
  ]);

  const transferEvents = [...holderChangeLogs, ...ownerChangeLogs];
  transferEvents.sort(
    (a, b) =>
      parseFloat(`${a.blockNumber}.${a.transactionIndex}`) - parseFloat(`${b.blockNumber}.${b.transactionIndex}`)
  );
  mergeChangeOwnersTransfers(transferEvents);

  return {
    eventType: "Transfer",
    documentOwner: address,
    beneficiary,
    holderChangeEvents: transferEvents,
  };
};

interface HolderChangeEventsInfo extends HolderChangeEvents {
  transactionIndex: number;
}

const mergeChangeOwnersTransfers = (transferEvents: HolderChangeEventsInfo[]): HolderChangeEventsInfo[] => {
  const removal = [];
  let previousTransactionHash = "";
  for (let i = 0; i < transferEvents.length; i++) {
    const transactionHash = transferEvents[i].transactionHash;
    const sameHash = transactionHash === previousTransactionHash;
    if (sameHash) {
      removal.push(i);
    }
    previousTransactionHash = transactionHash;
  }
  let count = 0;
  removal.forEach((index) => {
    index = index - count;
    const newIndex = index - 1;
    const beneficiary = transferEvents[newIndex].beneficiary || transferEvents[index].beneficiary;
    const holder = transferEvents[newIndex].holder || transferEvents[index].holder;
    transferEvents.splice(newIndex, 2, {
      ...transferEvents[newIndex],
      beneficiary: beneficiary,
      holder: holder,
    });
    count++;
  });
  return transferEvents;
};

export const fetchOwnerTransfers = async (
  titleEscrowContract: TitleEscrow,
  provider: providers.Provider
): Promise<HolderChangeEventsInfo[]> => {
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
      return (await (await provider.getBlock(event.blockNumber)).timestamp) * 1000;
    })
  );

  return ownerChangeLogsParsed.map((event, index) => ({
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
): Promise<HolderChangeEventsInfo[]> => {
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
      return (await (await provider.getBlock(event.blockNumber)).timestamp) * 1000;
    })
  );

  return holderChangeLogsParsed.map((event, index) => ({
    blockNumber: event.blockNumber,
    holder: event.args["toHolder"] as string,
    beneficiary: null,
    timestamp: blockTimes[index],
    transactionHash: event.transactionHash,
    transactionIndex: event.transactionIndex,
  }));
};

export const fetchEventInfo = async (
  address: string,
  blockNumber: number,
  eventType: TradeTrustErc721EventType,
  provider: providers.Provider
): Promise<TradeTrustErc721Event> => {
  const eventTimestamp = (await (await provider.getBlock(blockNumber)).timestamp) * 1000;
  return {
    eventType,
    documentOwner: address,
    eventTimestamp,
  };
};

export const fetchEvents = async (
  address: string,
  blockNumber: number,
  provider: providers.Provider
): Promise<TradeTrustErc721Event> => {
  const code = await provider.getCode(address);
  const isContractDeployed = code === "0x";
  if (isContractDeployed) {
    return await fetchEventInfo(address, blockNumber, "Transfer to Wallet", provider);
  } else {
    return await fetchEscrowTransfers(address, provider);
  }
};
