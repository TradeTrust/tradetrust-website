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

declare global {
  interface Window {
    ethereum: Ethereum;
    web3: {
      currentProvider: providers.Web3Provider;
    };
  }
}
