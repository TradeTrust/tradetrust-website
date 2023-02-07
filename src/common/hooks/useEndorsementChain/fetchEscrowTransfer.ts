import { providers } from "ethers";
import { TitleEscrow, TitleEscrow__factory } from "@govtechsg/token-registry/contracts";
import { TitleEscrowTransferEvent } from "../../../types";
import { EventFragment, Result } from "ethers/lib/utils";

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

/*
  Retrieve all events that emits BENEFICIARY_TRANSFER 
*/
export const fetchOwnerTransfers = async (
  titleEscrowContract: TitleEscrow,
  provider: providers.Provider
): Promise<TitleEscrowTransferEvent[]> => {
  const ownerChangeFilter = titleEscrowContract.filters.BeneficiaryTransfer(null, null);
  const ownerChangeLogs = await provider.getLogs({ ...ownerChangeFilter, fromBlock: 0 });

  const ownerChangeLogsParsed = getParsedLogs(ownerChangeLogs, titleEscrowContract);
  return ownerChangeLogsParsed.map((event) => ({
    type: "TRANSFER_BENEFICIARY",
    owner: event.args.toBeneficiary,
    blockNumber: event.blockNumber,
    transactionHash: event.transactionHash,
    transactionIndex: event.transactionIndex,
  }));
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
      ...titleEscrow.interface.parseLog(log),
    };
  });
};

/*
  Retrieve all events that emits HOLDER_TRANSFER 
*/
export const fetchHolderTransfers = async (
  titleEscrowContract: TitleEscrow,
  provider: providers.Provider
): Promise<TitleEscrowTransferEvent[]> => {
  const holderChangeFilter = titleEscrowContract.filters.HolderTransfer(null, null);
  const holderChangeLogs = await provider.getLogs({ ...holderChangeFilter, fromBlock: 0 });
  const holderChangeLogsParsed = getParsedLogs(holderChangeLogs, titleEscrowContract);
  return holderChangeLogsParsed.map((event) => ({
    type: "TRANSFER_HOLDER",
    blockNumber: event.blockNumber,
    holder: event.args.toHolder,
    transactionHash: event.transactionHash,
    transactionIndex: event.transactionIndex,
  }));
};
