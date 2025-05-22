import { UnsupportedNetworkError } from "../errors";
import { ChainId, ChainInfo, ChainInfoObject } from "../../constants/chain-info";
import { IS_DEVELOPMENT } from "../../config";
import { MAIN_NETWORKS, TEST_NETWORKS } from "../../config/chain-config";
import { encrypt } from "@trustvc/trustvc";

/**
 * Gets the ChainInfoObject of a supported chain ID.
 * Throws UnsupportedNetworkError if chain ID is not supported.
 * @param chainId Chain ID of network
 */
export const getChainInfo = (chainId: ChainId): ChainInfoObject => {
  const res = ChainInfo[chainId];
  if (!res) throw new UnsupportedNetworkError(chainId);
  return res;
};

/**
 * Helper function to get chain info from network name.
 * @param networkName Network name used by ethers standard providers and in OA
 */
export const getChainInfoFromNetworkName = (networkName: string): ChainInfoObject => {
  const res = Object.keys(ChainInfo)
    .map((chainId) => ChainInfo[Number(chainId) as ChainId])
    .find((chainInfo) => chainInfo.networkName === networkName);
  if (!res) throw new UnsupportedNetworkError(networkName);
  return res;
};

export const getSupportedChainIds = (): ChainId[] => {
  const isLocal = window.location.host.indexOf("localhost") > -1;
  const isTestEnv = process.env.NODE_ENV === "test";
  const networks = IS_DEVELOPMENT ? [...TEST_NETWORKS] : [...MAIN_NETWORKS];
  if (isTestEnv || isLocal) networks.push(ChainId.Local);
  return networks;
};

export const getUnsupportedChainIds = (): ChainId[] => {
  const allNetworks = new Set([...MAIN_NETWORKS, ...TEST_NETWORKS, ChainId.Local]);
  const supported = new Set(getSupportedChainIds());
  return Array.from(allNetworks).filter((id) => !supported.has(id));
};

/**
 * Returns an array of supported chain info based on the environment type.
 * Will include local chain if site is running under test or localhost environment.
 */
export const getSupportedChainInfo = (): ChainInfoObject[] => {
  const networks = getSupportedChainIds();
  return networks.map((chainId) => getChainInfo(chainId));
};

/**
 * Switches the network in user's wallet if installed.
 * @param chainId Chain ID of target network
 */
export const walletSwitchChain = async (chainId: ChainId): Promise<void> => {
  const { ethereum } = window;
  if (!ethereum || !ethereum.request) return;
  try {
    await ethereum.request({ method: "eth_requestAccounts" });
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${(+chainId).toString(16)}` }],
    });
  } catch (e: any) {
    if (e.code === -32601) {
      // Possibly on localhost which doesn't support the call
      return console.error(e);
    }
    if (e.code === 4902) {
      return walletAddChain(chainId);
    }
    throw e;
  }
};

/**
 * Adds network to user's wallet.
 * Networks with no RPC URL provided will not be added, particularly the default chains that already comes with Metamask.
 * @param chainId Chain ID of target network
 */
export const walletAddChain = async (chainId: ChainId): Promise<void> => {
  const { ethereum } = window;
  if (!ethereum || !ethereum.request) return;

  const chainInfo = ChainInfo[chainId];
  if (!chainInfo) return;

  const rpcUrl = chainInfo.rpcUrl;
  if (!rpcUrl) return;

  try {
    await ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: `0x${(+chainId).toString(16)}`,
          chainName: chainInfo.networkLabel,
          nativeCurrency: chainInfo.nativeCurrency,
          blockExplorerUrls: [chainInfo.explorerUrl],
          rpcUrls: [rpcUrl],
        },
      ],
    });
  } catch (e) {
    console.error(`Network ${chainId.toString()} could not be added.`, e);
    throw e;
  }
};

/**
 * encrypts the given remark with id using trustvc encryption
 * @param remark Rejection Remark
 * @param keyId Key ID
 * @returns Encrypted remark in hex format
 */
export const encryptRemark = (remark: string, keyId?: string): string => {
  return encrypt(remark, keyId ?? "");
};

export const isSupportedNetwork = (chainId: ChainId | number | string, networks?: ChainInfoObject[]) => {
  return (networks ?? getSupportedChainInfo()).some(
    (chainInfoObj) => chainInfoObj.chainId.toString() === chainId.toString()
  );
};
