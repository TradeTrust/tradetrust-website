import { ChainId } from "../constants/chain-info";

/**
 * Supported networks in production environment
 */
export const MAIN_NETWORKS = [
  ChainId.Ethereum, //
  ChainId.Polygon,
  ChainId.XDC,
  ChainId.Stability,
];

/**
 * Supported networks in development environment
 */
export const TEST_NETWORKS = [
  ChainId.Sepolia,
  ChainId.Amoy,
  ChainId.APOTHEM,
  ChainId.StabilityTestnet,
  ChainId.AstronTestnet,
];
