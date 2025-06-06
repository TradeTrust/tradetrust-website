import { INFURA_API_KEY, STABILITY_API_KEY, STABILITY_TESTNET_API_KEY } from "../config";

export type Network =
  | "homestead"
  | "local"
  | "sepolia"
  | "matic"
  | "amoy"
  | "xdc"
  | "xdcapothem"
  | "stabilitytestnet"
  | "stability"
  | "astron"
  | "astrontestnet";

export interface ChainInfoObject {
  label: string;
  iconImage: string;
  chainId: ChainId;
  networkName: Network; // network name that aligns with existing NETWORK_NAME
  networkLabel: string;
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

export type AvailableBlockChains = "ETH" | "MATIC" | "XDC" | "FREE" | "ASTRON";
export const AvailableBlockChains: AvailableBlockChains[] = ["ETH", "MATIC", "XDC", "FREE", "ASTRON"];

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

  // Astron
  AstronTestnet = 21002,
}

export const CHAIN: Partial<Record<ChainId, AvailableBlockChains>> = {
  [ChainId.Ethereum]: "ETH",
  [ChainId.Sepolia]: "ETH",
  [ChainId.Polygon]: "MATIC",
  [ChainId.Amoy]: "MATIC",
  [ChainId.XDC]: "XDC",
  [ChainId.APOTHEM]: "XDC",
  [ChainId.Stability]: "FREE",
  [ChainId.StabilityTestnet]: "FREE",
};

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
    label: "Stability Testnet",
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
  [ChainId.AstronTestnet]: {
    label: "Astron Testnet",
    chainId: ChainId.AstronTestnet,
    iconImage: "/static/images/networks/astron.png",
    networkName: "astrontestnet",
    networkLabel: "astron",
    explorerUrl: "https://dev-astronscanl2.bitfactory.cn/",
    rpcUrl: "https://dev-astronlayer2.bitfactory.cn/query/",
    nativeCurrency: {
      name: "ASTRON",
      symbol: "ASTRON",
      decimals: 18,
    },
  },
};
export const supportedMainnet = [
  ChainInfo[ChainId.Ethereum].networkName,
  ChainInfo[ChainId.Polygon].networkName,
  ChainInfo[ChainId.XDC].networkName,
  ChainInfo[ChainId.Stability].networkName,
  // ChainInfo[ChainId.Astron].networkName,
];

export const supportedTestnet = [
  ChainInfo[ChainId.Sepolia].networkName,
  ChainInfo[ChainId.Amoy].networkName,
  ChainInfo[ChainId.APOTHEM].networkName,
  ChainInfo[ChainId.StabilityTestnet].networkName,
  ChainInfo[ChainId.AstronTestnet].networkName,
];
