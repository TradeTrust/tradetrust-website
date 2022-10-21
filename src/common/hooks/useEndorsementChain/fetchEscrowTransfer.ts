import { providers } from "ethers";
import { TitleEscrow, TitleEscrow__factory } from "@govtechsg/token-registry/contracts";
import { TitleEscrowTransferEvent } from "../../../types";
import { mergeChangeOwnersTransfers } from "./helpers";

export const fetchEscrowTransfers = async (
  provider: providers.Provider,
  address: string
): Promise<TitleEscrowTransferEvent[]> => {
  const titleEscrowContract = TitleEscrow__factory.connect(address, provider);
  const isTitleEscrow = await titleEscrowContract.supportsInterface("0x079dff60");
  if (!isTitleEscrow) throw new Error(`Contract ${address} is not a title escrow contract`);
  // https://ethereum.stackexchange.com/questions/109326/combine-multiple-event-filters-in-ethersjs
  const holderChangeLogsDeferred = await fetchHolderTransfers(titleEscrowContract, provider);
  const ownerChangeLogsDeferred = await fetchOwnerTransfers(titleEscrowContract, provider);
  const [holderChangeLogs, ownerChangeLogs] = await Promise.all([holderChangeLogsDeferred, ownerChangeLogsDeferred]);
  return [...holderChangeLogs, ...ownerChangeLogs];
};

export const fetchOwnerTransfers = async (
  titleEscrowContract: TitleEscrow,
  provider: providers.Provider
): Promise<TitleEscrowTransferEvent[]> => {
  const ownerChangeFilter = titleEscrowContract.filters.BeneficiaryTransfer(null, null);
  const ownerChangeLogs = await provider.getLogs({ ...ownerChangeFilter, fromBlock: 0 });

  const ownerChangeLogsParsed = ownerChangeLogs.map((log) => {
    if (!log.blockNumber) throw new Error("Block number not present");
    return {
      ...log,
      ...titleEscrowContract.interface.parseLog(log),
    };
  });

  return ownerChangeLogsParsed.map((event, index) => ({
    type: "TRANSFER_BENEFICIARY",
    owner: event.args.toBeneficiary,
    blockNumber: event.blockNumber,
    transactionHash: event.transactionHash,
    transactionIndex: event.transactionIndex,
  }));
};

export const fetchHolderTransfers = async (
  titleEscrowContract: TitleEscrow,
  provider: providers.Provider
): Promise<TitleEscrowTransferEvent[]> => {
  const holderChangeFilter = titleEscrowContract.filters.HolderTransfer(null, null);
  const holderChangeLogs = await provider.getLogs({ ...holderChangeFilter, fromBlock: 0 });

  const holderChangeLogsParsed = holderChangeLogs.map((log) => {
    if (!log.blockNumber) throw new Error("Block number not present");
    return {
      ...log,
      ...titleEscrowContract.interface.parseLog(log),
    };
  });

  return holderChangeLogsParsed.map((event) => ({
    type: "TRANSFER_HOLDER",
    blockNumber: event.blockNumber,
    holder: event.args.toHolder,
    transactionHash: event.transactionHash,
    transactionIndex: event.transactionIndex,
  }));
};
