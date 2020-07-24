import { providers } from "ethers";
import { TitleEscrowFactory } from "@govtechsg/token-registry";
import { TitleEscrowEvent } from "../../../types";

export const fetchEscrowTransfers = async (
  address: string,
  provider: providers.Provider
): Promise<TitleEscrowEvent> => {
  const titleEscrowContract = TitleEscrowFactory.connect(address, provider);
  const isTitleEscrow = await titleEscrowContract.supportsInterface("0xdcce2211");
  if (!isTitleEscrow) throw new Error(`Contract ${address} is not a title escrow contract`);
  const holderChangeFilter = titleEscrowContract.filters.HolderChanged(null, null);
  const holderChangeLogsDeferred = provider.getLogs({ ...holderChangeFilter, fromBlock: 0 });

  const beneficiaryDeferred = titleEscrowContract.beneficiary();
  const [beneficiary, holderChangeLogs] = await Promise.all([beneficiaryDeferred, holderChangeLogsDeferred]);
  const holderChangeLogsParsed = holderChangeLogs.map((log) => {
    if (!log.blockNumber) throw new Error("Block number not present");
    return {
      blockNumber: log.blockNumber,
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
  return {
    titleEscrowAddress: address,
    beneficiary,
    holderChangeEvents: holderChangeLogsParsed.map((event, index) => ({
      blockNumber: event.blockNumber,
      holder: event.values.newHolder as string,
      timestamp: blockTimes[index],
    })),
  };
};
