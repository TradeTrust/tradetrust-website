import { useMemo } from "react";
import { ethers, providers, Signer } from "ethers";

interface ProviderAndSigner {
  provider: providers.Web3Provider;
  signer: Signer;
}

export const useInjectedProvider = () => {
  const getProvider = (): ProviderAndSigner => {
    const { ethereum, web3 } = window;
    const injectedWeb3 = ethereum || web3?.currentProvider;
    if (!injectedWeb3) throw new Error("No injected web3 provider found");
    const provider = new ethers.providers.Web3Provider(injectedWeb3);
    const signer = provider.getSigner();
    return { provider, signer };
  };

  return useMemo<ProviderAndSigner>(getProvider, [window.ethereum]);
};