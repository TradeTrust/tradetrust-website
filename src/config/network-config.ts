import { ChainId, ChainInfoObject, getChainInfo } from "./chain-info";

/**
 * Supported networks in production environment
 */
const MAIN_NETWORKS = [
  ChainId.Ethereum, //
  ChainId.Polygon,
];

/**
 * Supported networks in development environment
 */
const TEST_NETWORKS = [
  ChainId.Ropsten, //
  ChainId.Rinkeby,
  ChainId.Goerli,
  ChainId.PolygonMumbai,
];

/**
 * Returns an array of supported chain info based on the environment type
 */
export const getSupportedChainInfo = (): ChainInfoObject[] => {
  const networks =
    process.env.NODE_ENV === "development"
      ? window.location.host.indexOf("localhost") > -1
        ? [...TEST_NETWORKS, ChainId.Local]
        : TEST_NETWORKS
      : MAIN_NETWORKS;
  return networks.map((chainId) => getChainInfo(chainId));
};
