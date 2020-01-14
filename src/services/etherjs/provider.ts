import { ethers, providers } from "ethers";

declare global {
  interface Window {
    ethereum: providers.Web3Provider;
    web3: {
      currentProvider: providers.Web3Provider;
    };
  }
}

export const getProvider = (): { provider: providers.JsonRpcProvider; signer: ethers.Signer } => {
  const { ethereum, web3 } = window;
  const alreadyInjected = typeof ethereum !== "undefined" || typeof web3 !== "undefined";

  if (!alreadyInjected) throw new Error("Metamask cannot be found");

  const provider = new ethers.providers.Web3Provider(ethereum || web3.currentProvider);
  const signer = provider.getSigner();
  return { provider, signer };
};
