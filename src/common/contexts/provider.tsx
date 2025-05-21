import { ProviderDetails, utils } from "@trustvc/trustvc";
import { ethers, providers } from "ethers";
import React, { createContext, FunctionComponent, useCallback, useContext, useEffect, useRef, useState } from "react";
import { INFURA_API_KEY, NETWORK_NAME } from "../../config";
import { ChainId, ChainInfo, ChainInfoObject } from "../../constants/chain-info";
import { UnsupportedNetworkError } from "../errors";
import { getChainInfo, getChainInfoFromNetworkName, isSupportedNetwork, walletSwitchChain } from "../utils/chain-utils";
import { useMagicContext } from "./MagicContext";

export enum SIGNER_TYPE {
  IDENTITY = "Identity", // Internal RPC to query only.
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
  disconnectWallet: (disconnectOnly?: boolean) => Promise<void>;
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
  disconnectWallet: () => Promise.resolve(),
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
  const { magic, changeMagicNetwork, isLoggedIn: isMagicLoggedIn, logoutMagicLink } = useMagicContext();

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
    if (providerType === SIGNER_TYPE.METAMASK) {
      await walletSwitchChain(chainId);
    } else if (providerType === SIGNER_TYPE.MAGIC) {
      await changeMagicNetwork(chainId);
    }
    setCurrentChainId(chainId);

    // Escape same network switch, loading error
    if (currentChainId === chainId) setNetworkChangeLoading(false);
  };

  const getMetaMaskWallet = async (throwError: boolean = true): Promise<providers.Web3Provider | undefined> => {
    const { ethereum, web3 } = window;
    const injectedWeb3 = ethereum || (web3 && web3.currentProvider);
    if (!injectedWeb3) {
      if (!throwError) return;
      throw new Error("Oops! Seems like MetaMask is not installed in your browser");
    }
    return new ethers.providers.Web3Provider(injectedWeb3, "any");
  };

  const updateProvider = useCallback(
    async (_providerType: SIGNER_TYPE = providerType) => {
      let newProvider: providers.Provider | undefined = undefined;

      if (_providerType === SIGNER_TYPE.METAMASK) {
        const { ethereum, web3 } = window;
        const metamaskExtensionNotFound = typeof ethereum === "undefined" || typeof web3 === "undefined";
        if (metamaskExtensionNotFound || !ethereum?.request) {
          console.warn("MetaMask extension not found");
        } else {
          const injectedWeb3 = ethereum || (web3 && web3.currentProvider);

          newProvider = new ethers.providers.Web3Provider(injectedWeb3, "any");
          const network = await newProvider.getNetwork();
          if (!isSupportedNetwork(network.chainId)) {
            console.warn("User wallet is connected to an unsupported network, will fallback to default network");
            setProvider(undefined);
            setAccount(undefined);
            setProviderType(SIGNER_TYPE.NONE);
          } else {
            setProvider(newProvider);
            setCurrentChainId(network.chainId);
            return newProvider;
          }
        }
      } else if (_providerType === SIGNER_TYPE.MAGIC) {
        if (!magic) return;
        newProvider = new ethers.providers.Web3Provider(magic.rpcProvider as any, "any");
        const network = await newProvider.getNetwork();
        if (!isSupportedNetwork(network.chainId)) {
          console.warn("User wallet is connected to an unsupported network, will fallback to default network");
          setProvider(undefined);
          setAccount(undefined);
          setProviderType(SIGNER_TYPE.NONE);
        } else {
          setProvider(newProvider);
          setCurrentChainId(network.chainId);
          return newProvider;
        }
      }

      // fallback to internal default rpcUrl
      newProvider = createProvider(currentChainId || defaultChainId);
      setProvider(newProvider);
      setProviderType(SIGNER_TYPE.IDENTITY);
      setAccount(undefined);
      return newProvider;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentChainId, defaultChainId, providerType]
  );

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
    setNetworkChangeLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider]);

  const initializeMetaMaskSigner = async () => {
    try {
      const newProvider: ethers.providers.Web3Provider = (await getMetaMaskWallet())!;

      // Request to connect to MetaMask
      await newProvider.send("eth_requestAccounts", []);
      const chainInfo = getChainInfo(currentChainId ?? defaultChainId);
      await walletSwitchChain(chainInfo.chainId);

      setProviderType(SIGNER_TYPE.METAMASK);
    } catch (error: any) {
      console.error("initializeMetaMaskSigner", error);
      setProviderType(SIGNER_TYPE.NONE);
      throw error; // Re-throw the error to be handled by the caller
    }
  };

  const initialiseMagicSigner = async () => {
    if (!magic) return;

    try {
      if (!isMagicLoggedIn) {
        await magic.wallet.connectWithUI();
      }

      setProviderType(SIGNER_TYPE.MAGIC);
    } catch (error: any) {
      console.error("initialiseMagicSigner", error);
      setProviderType(SIGNER_TYPE.NONE);
      throw error; // Re-throw the error to be handled by the caller
    }
  };

  const upgradeToMetaMaskSigner = async () => {
    if (providerType === SIGNER_TYPE.METAMASK) return;
    await disconnectWallet(false);
    return initializeMetaMaskSigner();
  };

  const upgradeToMagicSigner = async () => {
    if (providerType === SIGNER_TYPE.MAGIC) return;
    await disconnectWallet(false);
    return initialiseMagicSigner();
  };

  const reloadNetwork = async () => {
    if (!provider) throw new UnsupportedNetworkError();

    const chainId = (await provider.getNetwork()).chainId;
    await changeNetwork(chainId);
  };

  const disconnectWallet = async (disconnectOnly: boolean = true) => {
    if (providerType === SIGNER_TYPE.MAGIC) {
      logoutMagicLink();
    } else if (providerType === SIGNER_TYPE.METAMASK) {
      if (!window?.ethereum || !window?.ethereum?.request) return;
      try {
        // Experimental functions: https://github.com/MetaMask/metamask-improvement-proposals/blob/main/MIPs/mip-2.md
        await window.ethereum.request({
          method: "wallet_revokePermissions",
          params: [{ eth_accounts: {} }],
        });
      } catch (error) {
        console.error("Error revoking wallet permissions:", error);
      }
    }

    if (disconnectOnly) {
      // After wallet disconnected, provider will become internal default provider
      setProviderType(SIGNER_TYPE.NONE);
      setAccount(undefined);
    }
  };

  useEffect(() => {
    updateSigner();
  }, [updateSigner]);

  useEffect(() => {
    currentProvider = provider;
  }, [provider]);

  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = () => {
      if (providerType !== SIGNER_TYPE.METAMASK) return;
      updateProvider(SIGNER_TYPE.METAMASK);
    };

    const handleChainChanged = (chainIdHex: string) => {
      if (providerType !== SIGNER_TYPE.METAMASK) return;
      changeNetwork(parseInt(chainIdHex, 16));
    };

    const handleDisconnect = () => {
      if (providerType !== SIGNER_TYPE.METAMASK) return;
      disconnectWallet(true);
    };

    window.ethereum
      .on("accountsChanged", handleAccountsChanged)
      .on("chainChanged", handleChainChanged)
      .on("disconnect", handleDisconnect);

    return () => {
      if (!window.ethereum) return;
      window.ethereum
        .removeListener("accountsChanged", handleAccountsChanged)
        .removeListener("chainChanged", handleChainChanged)
        .removeListener("disconnect", handleDisconnect);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [providerType, updateProvider, currentChainId]);

  useEffect(() => {
    // On initial load, check if MetaMask is connected or Magic is logged in, set providerType if it is
    if (providerType === SIGNER_TYPE.NONE) {
      (async () => {
        const metamask = await getMetaMaskWallet(false);
        if (!metamask) return;

        const accounts = await metamask?.listAccounts();
        if (accounts.length > 0) {
          setProviderType(SIGNER_TYPE.METAMASK);
        }
      })();
      if (magic && magic?.user) {
        (async () => {
          const isLoggedIn = await magic?.user?.isLoggedIn?.();
          if (isLoggedIn) {
            setProviderType(SIGNER_TYPE.MAGIC);
          }
        })();
      }
    }
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
