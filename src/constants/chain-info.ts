import { INFURA_API_KEY, STABILITY_API_KEY } from "../config";

export interface ChainInfoObject {
  label: string;
  iconImage: string;
  chainId: ChainId;
  networkName: string; // network name that aligns with existing NETWORK_NAME
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

export const AvailableBlockChains = ["ETH", "MATIC", "XDC", "HBAR", "FREE"];

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

  // Hedera Network
  HederaMainnet = 295,
  HederaTestnet = 296,
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
    explorerUrl: "https://www.oklink.com/amoy",
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
    rpcUrl: "https://tradetrustrpc.xdcrpc.com",
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
    rpcUrl: "https://tradetrustarpc.xdcrpc.com",
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
    rpcUrl: `https://gtn.stabilityprotocol.com/zgt/${STABILITY_API_KEY}`,
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
    rpcUrl: "https://free.testnet.stabilityprotocol.com",
    nativeCurrency: {
      name: "FREE",
      symbol: "FREE",
      decimals: 18,
    },
  },
  [ChainId.HederaMainnet]: {
    label: "Hedera Mainnet",
    chainId: ChainId.HederaMainnet,
    iconImage: "/static/images/networks/hedera.png",
    networkName: "hederamainnet",
    networkLabel: "Hedera Mainnet",
    explorerUrl: "https://hashscan.io/mainnet",
    rpcUrl: "https://hedera-mainnet-json-rpc.krypc.com/",
    nativeCurrency: {
      name: "HBAR",
      symbol: "HBAR",
      decimals: 18,
    },
  },
  [ChainId.HederaTestnet]: {
    label: "Hedera Testnet",
    chainId: ChainId.HederaTestnet,
    iconImage: "/static/images/networks/hedera.png",
    networkName: "hederatestnet",
    networkLabel: "Hedera Testnet",
    explorerUrl: "https://hashscan.io/testnet",
    rpcUrl: "https://hedera-testnet-json-rpc.krypc.com/",
    nativeCurrency: {
      name: "HBAR",
      symbol: "HBAR",
      decimals: 18,
    },
  },
};
