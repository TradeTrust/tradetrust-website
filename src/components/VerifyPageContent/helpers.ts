import { ChainId } from "../../constants/chain-info";
import { getChainInfo } from "../../common/utils/chain-utils";

type LoadCertificate = (certificate: any) => void;

export const getDemoCert = (chainId: ChainId): string => {
  let networkName: string | undefined;
  try {
    networkName = getChainInfo(chainId).networkName;
  } catch (e) {}

  return `/static/demo/${networkName}.tt`;
};

export const loadDemoCertificate = async (
  loadCertificate: LoadCertificate,
  chainId: ChainId,
  switchNetwork: (chainId: ChainId) => void
): Promise<void> => {
  switchNetwork(chainId);
  const res = await fetch(getDemoCert(chainId)).then((r) => r.json());
  loadCertificate(res);
};
