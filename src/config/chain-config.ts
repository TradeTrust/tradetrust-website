import { ChainId } from "../constants/chain-info";

/**
 * Supported networks in production environment
 */
export const MAIN_NETWORKS = [
  ChainId.Ethereum, //
  ChainId.Polygon,
];

/**
 * Supported networks in development environment
 */
export const TEST_NETWORKS = [
  ChainId.Goerli, // Deprecated
  ChainId.Sepolia,
  ChainId.PolygonMumbai,
];
