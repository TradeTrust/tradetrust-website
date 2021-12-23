import { ChainId, ChainInfoObject, getChainInfo } from "./chain-info";
import { isDevelopment } from ".";

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
 * Returns an array of supported chain info based on the environment type.
 * Will include local chain if site is running under test or localhost environment.
 */
export const getSupportedChainInfo = (): ChainInfoObject[] => {
  const isLocal = window.location.host.indexOf("localhost") > -1;
  const isTestEnv = process.env.NODE_ENV === "test";
  const networks = isDevelopment ? [...TEST_NETWORKS] : [...MAIN_NETWORKS];
  if (isTestEnv || isLocal) networks.push(ChainId.Local);
  return networks.map((chainId) => getChainInfo(chainId));
};
