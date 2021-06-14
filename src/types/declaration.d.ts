import { providers } from "ethers";
declare module "tailwindcss/resolveConfig";

declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.md";

interface Ethereum extends providers.ExternalProvider, providers.BaseProvider {
  enable: () => void;
}
declare global {
  interface Window {
    ethereum: Ethereum;
    web3: {
      currentProvider: providers.Web3Provider;
    };
  }
}