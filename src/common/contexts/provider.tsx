import { ethers, providers } from "ethers";
import React, { createContext, FunctionComponent, useCallback, useContext, useEffect, useRef, useState } from "react";
import { INFURA_API_KEY } from "../../config";
import { ProviderDetails, utils } from "@trustvc/trustvc";
import { magic } from "./helpers";
import { ChainId, ChainInfo, ChainInfoObject } from "../../constants/chain-info";
import { UnsupportedNetworkError } from "../errors";
import { getChainInfo, getChainInfoFromNetworkName, walletSwitchChain } from "../utils/chain-utils";
import { NETWORK_NAME } from "../../config";

export enum SIGNER_TYPE {
  IDENTITY = "Identity",
  METAMASK = "Metamask",
  MAGIC = "Magic",
  NONE = "None",
}

const createProvider = (chainId: ChainId) => {
  const url = ChainInfo[chainId].rpcUrl;
  const opts: ProviderDetails = url
    ? { url }
    : {
        network: getChainInfo(chainId).networkName,
        providerType: "infura",
        apiKey: INFURA_API_KEY,
      };
  return chainId === ChainId.Local ? new providers.JsonRpcProvider(url) : utils.generateProvider(opts);
};

// Utility function for use in non-react components that cannot get through hooks
let currentProvider: providers.Provider | undefined = createProvider(getChainInfoFromNetworkName(NETWORK_NAME).chainId);
export const getCurrentProvider = (): providers.Provider | undefined => currentProvider;

export interface ProviderContextProps {
  providerType: SIGNER_TYPE;
  upgradeToMetaMaskSigner: () => Promise<void>;
  upgradeToMagicSigner: () => Promise<void>;
  changeNetwork: (chainId: ChainId) => void;
  reloadNetwork: () => Promise<void>;
  supportedChainInfoObjects: ChainInfoObject[];
  currentChainId: ChainId | undefined;
  provider: providers.Provider | undefined;
  providerOrSigner: providers.Provider | ethers.Signer | undefined;
  account: string | undefined;
  networkChangeLoading: boolean;
  setNetworkChangeLoading: (loading: boolean) => void;
  disconnectWallet: () => void;
}

export const ProviderContext = createContext<ProviderContextProps>({
  providerType: SIGNER_TYPE.NONE,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  upgradeToMetaMaskSigner: async () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  upgradeToMagicSigner: async () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  changeNetwork: async (_chainId: ChainId) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  reloadNetwork: async () => {},
  supportedChainInfoObjects: [],
  currentChainId: undefined,
  provider: currentProvider,
  providerOrSigner: currentProvider,
  account: undefined,
  networkChangeLoading: false,
  setNetworkChangeLoading: () => {},
  disconnectWallet: () => {},
});

interface Ethereum extends providers.ExternalProvider, providers.BaseProvider {
  enable: () => void;
}

declare global {
  interface Window {
    ethereum: Ethereum;
    web3: {
      currentProvider: providers.ExternalProvider;
    };
  }
}

interface ProviderContextProviderProps {
  children: React.ReactNode;
  networks: ChainInfoObject[];
  defaultChainId: ChainId;
}

export const ProviderContextProvider: FunctionComponent<ProviderContextProviderProps> = ({
  children,
  networks: supportedChainInfoObjects,
  defaultChainId,
}) => {
  const defaultProvider = useRef(createProvider(defaultChainId));

  const isSupportedNetwork = useCallback(
    (chainId: ChainId | number | string) =>
      supportedChainInfoObjects.some((chainInfoObj) => chainInfoObj.chainId.toString() === chainId.toString()),
    [supportedChainInfoObjects]
  );

  const [providerType, setProviderType] = useState<SIGNER_TYPE>(SIGNER_TYPE.NONE);
  const [currentChainId, setCurrentChainId] = useState<ChainId | undefined>(
    isSupportedNetwork(defaultChainId) ? defaultChainId : undefined
  );
  const [account, setAccount] = useState<string | undefined>();
  const [providerOrSigner, setProviderOrSigner] = useState<providers.Provider | ethers.Signer | undefined>(
    defaultProvider.current
  );
  const [provider, setProvider] = useState<providers.Provider | undefined>(defaultProvider.current);

  const [networkChangeLoading, setNetworkChangeLoading] = useState<boolean>(false);

  const changeNetwork = async (chainId: ChainId) => {
    await walletSwitchChain(chainId);
    setCurrentChainId(chainId);
  };

  const updateProvider = useCallback(async () => {
    const { ethereum, web3 } = window;
    const metamaskExtensionNotFound = typeof ethereum === "undefined" || typeof web3 === "undefined";
    if (metamaskExtensionNotFound || !ethereum.request) {
      setProvider(createProvider(currentChainId || defaultChainId));
      setAccount(undefined);
    } else {
      const injectedWeb3 = ethereum || (web3 && web3.currentProvider);
      const newProvider = new ethers.providers.Web3Provider(injectedWeb3, "any");
      const network = await newProvider.getNetwork();
      if (!isSupportedNetwork(network.chainId)) {
        console.warn("User wallet is connected to an unsupported network, will fallback to default network");
        setProvider(undefined);
        setAccount(undefined);
        setCurrentChainId(undefined);
      } else {
        setProvider(newProvider);
        setCurrentChainId(network.chainId);
        if (injectedWeb3.isMetaMask) {
          setProviderType(SIGNER_TYPE.METAMASK);
        }
      }
    }
  }, [currentChainId, defaultChainId, isSupportedNetwork]);

  const updateSigner = useCallback(async () => {
    if (!provider) {
      return;
    }
    try {
      if (provider instanceof ethers.providers.Web3Provider) {
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          await provider.send("eth_requestAccounts", []);
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          setAccount(address);
          setProviderOrSigner(signer);
          return;
        }
      }
      setAccount(undefined);
      setProviderOrSigner(provider);
    } catch (e) {
      setAccount(undefined);
      setProviderOrSigner(createProvider(currentChainId!));
    }
  }, [provider, currentChainId]);

  const initializeMetaMaskSigner = async () => {
    if (!(provider instanceof ethers.providers.Web3Provider)) {
      throw new Error("Oops! Seems like MetaMask is not installed in your browser");
    }

    const web3Provider = provider as ethers.providers.Web3Provider;
    await web3Provider.send("eth_requestAccounts", []);
    const chainInfo = getChainInfo(currentChainId ?? defaultChainId);
    await walletSwitchChain(chainInfo.chainId);
    const signer = web3Provider.getSigner();
    const address = await signer.getAddress();
    setAccount(address);
    setProviderType(SIGNER_TYPE.METAMASK);
  };

  const initialiseMagicSigner = async () => {
    // needs to be cast as any before https://github.com/magiclabs/magic-js/issues/83 has been merged.
    const magicProvider = new ethers.providers.Web3Provider(magic.rpcProvider as any);

    setProvider(magicProvider);
    setProviderType(SIGNER_TYPE.MAGIC);
  };

  const upgradeToMetaMaskSigner = async () => {
    return initializeMetaMaskSigner();
  };

  const upgradeToMagicSigner = async () => {
    if (providerType === SIGNER_TYPE.MAGIC) return;
    return initialiseMagicSigner();
  };

  const reloadNetwork = async () => {
    if (!provider) throw new UnsupportedNetworkError();

    const chainId = (await provider.getNetwork()).chainId;
    await changeNetwork(chainId);
  };

  const disconnectWallet = useCallback(() => {
    setProviderType(SIGNER_TYPE.NONE);
    setAccount(undefined);
    setProviderOrSigner(provider);
    // Remove ethereum event listeners
    if (window.ethereum) {
      window.ethereum.removeAllListeners();
    }
  }, [provider]);

  useEffect(() => {
    updateProvider();
  }, [updateProvider]);

  useEffect(() => {
    updateSigner();
  }, [updateSigner]);

  useEffect(() => {
    currentProvider = provider;
  }, [provider]);

  useEffect(() => {
    if (!window.ethereum) return;

    window.ethereum
      .on("accountsChanged", updateProvider)
      .on("chainChanged", (chainIdHex: string) => changeNetwork(parseInt(chainIdHex, 16)));

    return () => {
      if (!window.ethereum) return;
      window.ethereum.off("chainChanged").off("accountsChanged");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProviderContext.Provider
      value={{
        providerType,
        upgradeToMetaMaskSigner,
        upgradeToMagicSigner,
        changeNetwork,
        reloadNetwork,
        supportedChainInfoObjects,
        currentChainId,
        provider,
        providerOrSigner,
        account,
        networkChangeLoading,
        setNetworkChangeLoading,
        disconnectWallet,
      }}
    >
      {children}
    </ProviderContext.Provider>
  );
};

export const useProviderContext = (): ProviderContextProps => useContext<ProviderContextProps>(ProviderContext);
