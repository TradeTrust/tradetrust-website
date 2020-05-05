import React, { createContext, useContext, useState } from "react";
import { ethers, providers, Signer } from "ethers";
import { NETWORK_NAME } from "../../config";

interface ProviderContextProps {
  isUpgraded: boolean;
  provider: providers.Provider | Signer;
  upgradeProvider: () => Promise<void>;
  account?: string;
}

export const ProviderContext = createContext<ProviderContextProps>({
  isUpgraded: false,
  provider: ethers.getDefaultProvider(NETWORK_NAME),
  upgradeProvider: async () => {},
  account: undefined,
});

export const ProviderContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isUpgraded, setIsUpgraded] = useState(false);
  const [provider, setProvider] = useState<providers.Provider | Signer>(ethers.getDefaultProvider(NETWORK_NAME));
  const [account, setAccount] = useState<string>();

  const upgradeProvider = async () => {
    if (isUpgraded) return;
    const { ethereum, web3 } = window;

    const metamaskExtensionNotFound = typeof ethereum === "undefined" || typeof web3 === "undefined";
    if (metamaskExtensionNotFound) throw new Error("Metamask not installed");

    await ethereum.enable();
    const injectedWeb3 = ethereum || web3.currentProvider;
    if (!injectedWeb3) throw new Error("No injected web3 provider found");
    const provider = new ethers.providers.Web3Provider(injectedWeb3);
    const signer = provider.getSigner();
    const account = (await provider.listAccounts())[0];

    setProvider(signer);
    setIsUpgraded(true);
    setAccount(account);
  };

  return (
    <ProviderContext.Provider value={{ isUpgraded, provider, upgradeProvider, account }}>
      {children}
    </ProviderContext.Provider>
  );
};

export const useProviderContext = (): ProviderContextProps => useContext<ProviderContextProps>(ProviderContext);
