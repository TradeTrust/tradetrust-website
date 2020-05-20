import { ethers, providers } from "ethers";
import { getLogger } from "../../utils/logger";
const { trace } = getLogger("service:etherjs:provider");

interface Ethereum extends providers.Web3Provider {
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

export const getProvider = (): { provider: providers.JsonRpcProvider; signer: ethers.Signer } => {
  const { ethereum, web3 } = window;
  const alreadyInjected = typeof ethereum !== "undefined" || typeof web3 !== "undefined";

  if (!alreadyInjected) throw new Error("Metamask cannot be found");

  const provider = new ethers.providers.Web3Provider(ethereum || web3.currentProvider);
  const signer = provider.getSigner();
  trace(`provider is ${provider} and signer is ${signer}`);
  return { provider, signer };
};
