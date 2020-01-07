import { ethers } from "ethers";

export const getProvider = (): { provider: ethers.providers.JsonRpcProvider; signer: ethers.Signer } => {
  const { ethereum, web3 } = window as any;
  const alreadyInjected = typeof ethereum !== "undefined" || typeof web3 !== "undefined";

  if (!alreadyInjected) throw new Error("Metamask cannot be found");

  const provider = new ethers.providers.Web3Provider(ethereum || web3.currentProvider);
  const signer = provider.getSigner();
  return { provider, signer };
};
