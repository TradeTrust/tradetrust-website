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
  const holderChangeLogsDeferred = titleEscrowContract.queryFilter(holderChangeFilter);
  const beneficiaryDeferred = titleEscrowContract.beneficiary();
  const [beneficiary, holderChangeLogs] = await Promise.all([beneficiaryDeferred, holderChangeLogsDeferred]);
  const blockTimes = await Promise.all(
    holderChangeLogs.map(async (event) => (await (await provider.getBlock(event.blockNumber)).timestamp) * 1000)
  );
  return {
    titleEscrowAddress: address,
    beneficiary,
    holderChangeEvents: holderChangeLogs.map((event, index) => ({
      blockNumber: event.blockNumber,
      holder: event.args?.newHolder as string,
      timestamp: blockTimes[index],
    })),
  };
};
