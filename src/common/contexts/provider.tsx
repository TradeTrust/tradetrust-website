import { MessageTitle } from "@govtechsg/tradetrust-ui-components";
import { ethers, providers, Signer } from "ethers";
import React, { createContext, useContext, useEffect, useState } from "react";
import { NETWORK_NAME } from "../../config";

const getProvider =
  NETWORK_NAME === "local" ? new providers.JsonRpcProvider() : new ethers.providers.InfuraProvider(NETWORK_NAME);

interface ProviderContextProps {
  isUpgraded: boolean;
  provider: providers.Provider | Signer;
  upgradeProvider: () => Promise<void>;
  account?: string;
}

export const ProviderContext = createContext<ProviderContextProps>({
  isUpgraded: false,
  provider: getProvider,
  upgradeProvider: async () => {},
  account: undefined,
});

export const ProviderContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isUpgraded, setIsUpgraded] = useState(false);
  const [provider, setProvider] = useState<providers.Provider | Signer>(getProvider);
  const [account, setAccount] = useState<string>();

  const initializeSigner = async () => {
    const { ethereum, web3 } = window;

    const metamaskExtensionNotFound = typeof ethereum === "undefined" || typeof web3 === "undefined";
    if (metamaskExtensionNotFound) throw new Error(MessageTitle.NO_METAMASK);

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

  const upgradeProvider = async () => {
    if (isUpgraded) return;
    return initializeSigner();
  };

  useEffect(() => {
    // Do not listen before the provider is upgraded by the app
    if (!isUpgraded) return;
    window.ethereum.on("accountsChanged", () => {
      return initializeSigner();
    });
  }, [isUpgraded]);

  return (
    <ProviderContext.Provider value={{ isUpgraded, provider, upgradeProvider, account }}>
      {children}
    </ProviderContext.Provider>
  );
};

export const useProviderContext = (): ProviderContextProps => useContext<ProviderContextProps>(ProviderContext);
