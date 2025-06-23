import type { networkCurrency } from "@tradetrust-tt/tradetrust-utils/constants/network";
import { INFURA_API_KEY, STABILITY_API_KEY, STABILITY_TESTNET_API_KEY } from "../config";

export interface ChainInfoObject {
  label: string;
  iconImage: string;
  chainId: ChainId;
  networkName: string; // network name that aligns with existing NETWORK_NAME
  networkLabel: string;
  blockNumber?: number;
  explorerUrl: string;
  rpcUrl?: string;
  nativeCurrency?: {
    name: string;
    symbol: string;
    decimals: number;
  };
}

export const InitialAddress = "0x0000000000000000000000000000000000000000";
export const BurnAddress = "0x000000000000000000000000000000000000dEaD";

export const AvailableBlockChains: string[] = ["ETH", "MATIC", "XDC", "FREE", "ASTRON"] satisfies networkCurrency[];

type ChainInfo = Record<ChainId, ChainInfoObject>;

export enum ChainId {
  // Localhost
  Local = 1337,

  // Ethereum
  Ethereum = 1,
  Sepolia = 11155111,

  // Polygon
  Polygon = 137,
  Amoy = 80002,

  // XDC Network
  XDC = 50,
  APOTHEM = 51,

  // Stability
  Stability = 101010,
  StabilityTestnet = 20180427,

  // Astron Network
  Astron = 1338,
}

export const ChainInfo: ChainInfo = {
  [ChainId.Local]: {
    label: "Local",
    chainId: ChainId.Local,
    iconImage: "/static/images/networks/ethereum.gif",
    networkName: "local",
    networkLabel: "Local",
    rpcUrl: "http://localhost:8545",
    explorerUrl: "https://localhost/explorer",
  },
  [ChainId.Ethereum]: {
    label: "Ethereum",
    chainId: ChainId.Ethereum,
    iconImage: "/static/images/networks/ethereum.gif",
    networkName: "homestead",
    networkLabel: "Ethereum",
    explorerUrl: "https://etherscan.io",
    rpcUrl: `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
  },
  [ChainId.Sepolia]: {
    label: "Sepolia",
    chainId: ChainId.Sepolia,
    iconImage: "/static/images/networks/ethereum.gif",
    networkName: "sepolia",
    networkLabel: "Sepolia",
    explorerUrl: "https://sepolia.etherscan.io",
    rpcUrl: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
    nativeCurrency: {
      name: "ETH",
      symbol: "sepETH",
      decimals: 18,
    },
  },
  [ChainId.Polygon]: {
    label: "Polygon",
    chainId: ChainId.Polygon,
    iconImage: "/static/images/networks/polygon.gif",
    networkName: "matic",
    networkLabel: "Polygon",
    explorerUrl: "https://polygonscan.com",
    rpcUrl: `https://polygon-mainnet.infura.io/v3/${INFURA_API_KEY}`,
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
  },
  [ChainId.Amoy]: {
    label: "Amoy",
    chainId: ChainId.Amoy,
    iconImage: "/static/images/networks/polygon.gif",
    networkName: "amoy",
    networkLabel: "Polygon Amoy",
    explorerUrl: "https://amoy.polygonscan.com",
    rpcUrl: `https://polygon-amoy.infura.io/v3/${INFURA_API_KEY}`,
    nativeCurrency: {
      name: "MATIC",
      symbol: "aMATIC",
      decimals: 18,
    },
  },
  [ChainId.XDC]: {
    label: "XDC Network",
    chainId: ChainId.XDC,
    iconImage: "/static/images/networks/xdc.png",
    networkName: "xdc",
    networkLabel: "XDC Network",
    blockNumber: 60000000,
    explorerUrl: "https://xdcscan.io",
    rpcUrl: "https://rpc.ankr.com/xdc",
    nativeCurrency: {
      name: "XDC",
      symbol: "XDC",
      decimals: 18,
    },
  },
  [ChainId.APOTHEM]: {
    label: "Apothem",
    chainId: ChainId.APOTHEM,
    iconImage: "/static/images/networks/xdc.png",
    networkName: "xdcapothem",
    networkLabel: "XDC Testnet Apothem",
    blockNumber: 50000000,
    explorerUrl: "https://apothem.xdcscan.io",
    rpcUrl: "https://rpc.ankr.com/xdc_testnet",
    nativeCurrency: {
      name: "XDCt",
      symbol: "XDCt",
      decimals: 18,
    },
  },
  [ChainId.Stability]: {
    label: "Stability (Beta)",
    chainId: ChainId.Stability,
    iconImage: "/static/images/networks/stability.png",
    networkName: "stability",
    networkLabel: "Stability",
    explorerUrl: "https://stability.blockscout.com",
    rpcUrl: `https://rpc.stabilityprotocol.com/zgt/${STABILITY_API_KEY}`,
    nativeCurrency: {
      name: "FREE",
      symbol: "FREE",
      decimals: 18,
    },
  },
  [ChainId.StabilityTestnet]: {
    label: "Stability Testnet (Beta)",
    chainId: ChainId.StabilityTestnet,
    iconImage: "/static/images/networks/stability.png",
    networkName: "stabilitytestnet",
    networkLabel: "Stability Testnet",
    explorerUrl: "https://stability-testnet.blockscout.com/",
    rpcUrl: `https://rpc.testnet.stabilityprotocol.com/zgt/${STABILITY_TESTNET_API_KEY}`,
    nativeCurrency: {
      name: "FREE",
      symbol: "FREE",
      decimals: 18,
    },
  },
  [ChainId.Astron]: {
    label: "Astron Network (Beta)",
    chainId: ChainId.Astron,
    iconImage: "/static/images/networks/astron.png",
    networkName: "astron",
    networkLabel: "astron",
    explorerUrl: "https://astronscanl2.bitfactory.cn/",
    rpcUrl: "https://astronlayer2.bitfactory.cn/rpc/",
    nativeCurrency: {
      name: "ASTRON",
      symbol: "ASTRON",
      decimals: 18,
    },
  },
};
