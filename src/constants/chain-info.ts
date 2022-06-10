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
    decimals: 18;
  };
}

type ChainInfo = Record<ChainId, ChainInfoObject>;

export enum ChainId {
  // Localhost
  Local = 1337,

  // Ethereum Mainnet
  Ethereum = 1,

  // Ethereum Testnet
  Ropsten = 3,
  Rinkeby = 4,
  Goerli = 5,
  Kovan = 42,

  // Polygon
  Polygon = 137,
  PolygonMumbai = 80001,
}

export const ChainInfo: ChainInfo = {
  [ChainId.Local]: {
    label: "Local",
    chainId: ChainId.Local,
    iconImage: "/static/images/networks/ethereum.gif",
    networkName: "local",
    networkLabel: "Local",
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
  [ChainId.Ropsten]: {
    label: "Ropsten",
    chainId: ChainId.Ropsten,
    iconImage: "/static/images/networks/ethereum.gif",
    networkName: "ropsten",
    networkLabel: "Ropsten",
    explorerUrl: "https://ropsten.etherscan.io",
  },
  [ChainId.Rinkeby]: {
    label: "Rinkeby",
    chainId: ChainId.Rinkeby,
    iconImage: "/static/images/networks/ethereum.gif",
    networkName: "rinkeby",
    networkLabel: "Rinkeby",
    explorerUrl: "https://rinkeby.etherscan.io",
  },
  [ChainId.Goerli]: {
    label: "Goerli",
    chainId: ChainId.Goerli,
    iconImage: "/static/images/networks/ethereum.gif",
    networkName: "goerli",
    networkLabel: "Goerli",
    explorerUrl: "https://goerli.etherscan.io",
  },
  [ChainId.Kovan]: {
    label: "Kovan",
    chainId: ChainId.Kovan,
    iconImage: "/static/images/networks/ethereum.gif",
    networkName: "kovan",
    networkLabel: "Kovan",
    explorerUrl: "https://kovan.etherscan.io",
  },
  [ChainId.Polygon]: {
    label: "Polygon (Beta)",
    chainId: ChainId.Polygon,
    iconImage: "/static/images/networks/polygon.gif",
    networkName: "matic",
    networkLabel: "Polygon",
    explorerUrl: "https://polygonscan.com",
    rpcUrl: "https://polygon-rpc.com",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
  },
  [ChainId.PolygonMumbai]: {
    label: "Polygon Mumbai",
    chainId: ChainId.PolygonMumbai,
    iconImage: "/static/images/networks/polygon.gif",
    networkName: "maticmum",
    networkLabel: "Polygon Mumbai",
    explorerUrl: "https://mumbai.polygonscan.com",
    rpcUrl: "https://rpc-mumbai.matic.today",
    nativeCurrency: {
      name: "MATIC",
      symbol: "mMATIC",
      decimals: 18,
    },
  },
};
