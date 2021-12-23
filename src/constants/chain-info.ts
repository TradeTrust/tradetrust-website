export interface ChainInfoObject {
  label: string;
  iconImage: string;
  chainId: ChainId;
  networkName: string; // network name that aligns with existing NETWORK_NAME
  explorerUrl: string;
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
    explorerUrl: "https://localhost/explorer",
  },
  [ChainId.Ethereum]: {
    label: "Ethereum",
    chainId: ChainId.Ethereum,
    iconImage: "/static/images/networks/ethereum.gif",
    networkName: "homestead",
    explorerUrl: "https://etherscan.io",
  },
  [ChainId.Ropsten]: {
    label: "Ropsten",
    chainId: ChainId.Ropsten,
    iconImage: "/static/images/networks/ethereum.gif",
    networkName: "ropsten",
    explorerUrl: "https://ropsten.etherscan.io",
  },
  [ChainId.Rinkeby]: {
    label: "Rinkeby",
    chainId: ChainId.Rinkeby,
    iconImage: "/static/images/networks/ethereum.gif",
    networkName: "rinkeby",
    explorerUrl: "https://rinkeby.etherscan.io",
  },
  [ChainId.Goerli]: {
    label: "Goerli",
    chainId: ChainId.Goerli,
    iconImage: "/static/images/networks/ethereum.gif",
    networkName: "goerli",
    explorerUrl: "https://goerli.etherscan.io",
  },
  [ChainId.Kovan]: {
    label: "Kovan",
    chainId: ChainId.Kovan,
    iconImage: "/static/images/networks/ethereum.gif",
    networkName: "kovan",
    explorerUrl: "https://kovan.etherscan.io",
  },
  [ChainId.Polygon]: {
    label: "Polygon (Beta)",
    chainId: ChainId.Polygon,
    iconImage: "/static/images/networks/polygon.gif",
    networkName: "matic",
    explorerUrl: "https://polygonscan.com",
  },
  [ChainId.PolygonMumbai]: {
    label: "Polygon Mumbai",
    chainId: ChainId.PolygonMumbai,
    iconImage: "/static/images/networks/polygon.gif",
    networkName: "maticmum",
    explorerUrl: "https://mumbai.polygonscan.com",
  },
};
