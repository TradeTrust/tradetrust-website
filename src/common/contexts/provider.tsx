import { ethers, providers, Signer } from "ethers";
import React, { createContext, FunctionComponent, useCallback, useContext, useEffect, useState } from "react";
import { INFURA_API_KEY } from "../../config";
import { utils } from "@govtechsg/oa-verify";
import { magic } from "./helpers";
import { ChainId, ChainInfoObject } from "../../constants/chain-info";
import { NoMetaMaskError, UnsupportedNetworkError } from "../errors";
import { getChainInfo } from "../utils/chain-utils";
import Web3Modal from "web3modal";

import WalletConnectProvider from "@walletconnect/web3-provider";
import { InfuraProvider, Web3Provider } from "@ethersproject/providers";
const providerOptions = {
  /* See Provider Options Section */
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: INFURA_API_KEY, // required
    },
  },
};

export enum SIGNER_TYPE {
  WALLETCONNECT = "WalletConnect",
  IDENTITY = "Identity",
  METAMASK = "Metamask",
  MAGIC = "Magic",
}

// Utility function for use in non-react components that cannot get through hooks
let currentProvider: providers.Provider | undefined;
export const getCurrentProvider = (): providers.Provider | undefined => currentProvider;

// Default Provider
const createProvider = (chainId: ChainId) => {
  if (chainId === ChainId.Local) {
    return new providers.JsonRpcProvider();
  } else {
    return utils.generateProvider({
      network: getChainInfo(chainId).networkName,
      providerType: "infura",
      apiKey: INFURA_API_KEY,
    });
  }
};

interface ProviderContextProps {
  providerType: SIGNER_TYPE;
  getWeb3Modal: () => Promise<Web3Modal>;
  setWeb3Provider: (web3Modal: any) => Promise<void>;
  logout: () => Promise<void>;
  upgradeToMagicSigner: () => Promise<void>;
  changeNetwork: (chainId: ChainId) => void;
  reloadNetwork: () => Promise<void>;
  getTransactor: () => Signer | providers.Provider | undefined;
  getSigner: () => Signer | undefined;
  getProvider: () => providers.Provider | undefined;
  supportedChainInfoObjects: ChainInfoObject[];
  currentChainId: ChainId | undefined;
}

export const ProviderContext = createContext<ProviderContextProps>({
  providerType: SIGNER_TYPE.IDENTITY,
  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  getWeb3Modal: async () => {
    return new Web3Modal();
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setWeb3Provider: async () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logout: async () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  upgradeToMagicSigner: async () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  changeNetwork: async (_chainId: ChainId) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  reloadNetwork: async () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getTransactor: () => undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getProvider: () => undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getSigner: () => undefined,
  supportedChainInfoObjects: [],
  currentChainId: undefined,
});

// interface Ethereum extends providers.ExternalProvider, providers.BaseProvider {
//   enable: () => void;
// }

// declare global {
//   interface Window {
//     ethereum: Ethereum;
//     web3: {
//       currentProvider: providers.ExternalProvider;
//     };
//   }
// }

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
  const [providerType, setProviderType] = useState<SIGNER_TYPE>(SIGNER_TYPE.IDENTITY);
  const [isConnected, setIsConnected] = useState<boolean>();
  const [currentChainId, setCurrentChainId] = useState<ChainId | undefined>(defaultChainId);
  const [web3Modal] = useState<Web3Modal>(
    new Web3Modal({
      // network: getChainInfo(networkChainId).networkName, // optional
      // network: getChainInfo(1).networkName, // optional
      // cacheProvider: true, // optional
      cacheProvider: true, // optional
      providerOptions, // required
    })
  );

  const isSupportedNetwork = (chainId: ChainId) =>
    supportedChainInfoObjects.some((chainInfoObj) => chainInfoObj.chainId === chainId);

  const defaultProvider = isSupportedNetwork(defaultChainId) ? createProvider(defaultChainId) : undefined;

  const [web3Provider, updateWeb3Provider] = useState<providers.Web3Provider | undefined>(undefined);
  const [providerOrSigner, setProviderOrSigner] = useState<providers.Provider | Signer | undefined>(defaultProvider);

  const updateProviderOrSigner = async (newProviderOrSigner: typeof providerOrSigner) => {
    console.log("update");
    try {
      if (!Signer.isSigner(newProviderOrSigner)) {
        setIsConnected(false);
      } else {
        await (newProviderOrSigner as Signer).getAddress();
        setIsConnected(true);
      }
    } catch (e) {
      setIsConnected(false);
    }
    setProviderOrSigner(newProviderOrSigner);
  };

  const changeNetwork = async (chainId: ChainId) => {
    // console.log(chainId)
    // console.log(typeof chainId)
    // console.log(isSupportedNetwork(chainId))
    // return;
    if (!isSupportedNetwork(chainId)) throw new UnsupportedNetworkError(chainId);
    // const chainInfo = getChainInfo(chainId);
    try {
      let provider = getWeb3Provider();
      if ((await provider?.getNetwork?.())?.chainId === chainId) {
        return;
      }
      if (provider instanceof InfuraProvider) {
        provider = createProvider(chainId);
      } else {
        await requestSwitchChain(chainId);
      }
      if (provider instanceof Web3Provider || provider instanceof WalletConnectProvider) {
        await updateProviderOrSigner(provider.getSigner());
      } else {
        // console.log(provider)
        await updateProviderOrSigner(provider);
      }
    } catch (e: unknown) {
      if (e instanceof NoMetaMaskError) {
        console.warn(e.message);
        // await updateProviderOrSigner(createProvider(chainInfo.chainId));
      } else {
        throw e;
      }
    }
  };

  const getWeb3Provider = () => {
    if (web3Provider) return web3Provider;
    else {
      return getProvider();
    }
    // else { throw }
    // const { ethereum, web3 } = window;
    // const metamaskExtensionNotFound = typeof ethereum === "undefined" || typeof web3 === "undefined";
    // if (metamaskExtensionNotFound || !ethereum.request) throw new NoMetaMaskError();

    // const injectedWeb3 = ethereum || web3.currentProvider;
    // if (!injectedWeb3) throw new Error("No injected web3 provider found");
    // return new ethers.providers.Web3Provider(injectedWeb3, "any");
  };

  const requestSwitchChain = async (chainId: ChainId) => {
    const ethereum = getWeb3Provider();
    if (!(ethereum instanceof Web3Provider)) {
      return;
    }
    if (!ethereum || !ethereum.provider.request) return;
    try {
      ethereum.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
    } catch (e: any) {
      if (e.code === -32601) {
        // Possibly on localhost which doesn't support the call
        return console.error(e);
      } else if (e.message === "JSON RPC response format is invalid") {
        // Could be walletconnect
        // console.log("test");
        // console.log(getInjectedProviderName());
        // console.log(ethereum.provider);
        // console.log(web3Provider);
        // console.log("test1");
        return console.error(e);
      }
      throw e;
    }
  };

  const initialiseMagicSigner = async () => {
    // needs to be cast as any before https://github.com/magiclabs/magic-js/issues/83 has been merged.
    const magicProvider = new ethers.providers.Web3Provider(magic.rpcProvider as any);

    await updateProviderOrSigner(magicProvider.getSigner());
    setProviderType(SIGNER_TYPE.MAGIC);
  };

  const setWeb3Provider = async (instance: any) => {
    const userWeb3Provider = new ethers.providers.Web3Provider(instance);
    if (!userWeb3Provider || !userWeb3Provider.provider.request) return;
    const provider = getProvider();
    const networkChainId = provider ? (await provider.getNetwork()).chainId : 1; //: web3Provider.getNetwork());
    await updateWeb3Provider(userWeb3Provider);
    requestSwitchChain(networkChainId);
    await updateProviderOrSigner(userWeb3Provider.getSigner());
    setProviderType(SIGNER_TYPE.METAMASK);
  };

  const getWeb3Modal = async (): Promise<Web3Modal> => {
    return web3Modal;
  };

  const logout = async () => {
    if (!web3Modal) {
      return;
    }
    await web3Modal.clearCachedProvider();
    window.location.reload();
  };

  /* Open wallet selection modal. */
  const loadWeb3Modal = useCallback(async () => {
    if (!web3Modal) {
      return;
    }
    const newProvider = await web3Modal.connect();
    setWeb3Provider(newProvider);
    console.log("loadWeb3Modal");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* If user has loaded a wallet before, load it automatically. */
  useEffect(() => {
    console.log("???");
    console.log(web3Modal);
    if (!web3Modal) {
      return;
    }
    if (web3Modal.cachedProvider) {
      loadWeb3Modal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadWeb3Modal]);

  // Utility Functions //

  const reloadNetwork = async () => {
    console.log("reloadNetwork");
    const provider = getProvider();
    if (!provider) throw new UnsupportedNetworkError();

    const chainId = (await provider.getNetwork()).chainId;
    await changeNetwork(chainId);
  };

  const accountsChanged = (accounts: string[]) => {
    const theweb3Provider = getWeb3Provider();
    if (theweb3Provider instanceof Web3Provider) {
      updateProviderOrSigner(theweb3Provider.getSigner());
    }
    console.log(accounts);
    // reloadNetwork();
  };

  const getProvider = useCallback(() => {
    if (providers.Provider.isProvider(providerOrSigner)) return providerOrSigner;
    if (Signer.isSigner(providerOrSigner)) return providerOrSigner.provider;
    return undefined;
  }, [providerOrSigner]);

  const getSigner = useCallback(
    () => (isConnected ? (providerOrSigner as Signer) : undefined),
    [isConnected, providerOrSigner]
  );

  const getTransactor = useCallback(() => getSigner() ?? getProvider(), [getProvider, getSigner]);

  // Utility Functions //

  useEffect(() => {
    currentProvider = getProvider();
    const updateChainId = async () => {
      const provider = getProvider();
      if (!provider) {
        setCurrentChainId(undefined);
      } else {
        const network = await provider.getNetwork();
        setCurrentChainId(network.chainId);
      }
    };
    updateChainId();
  }, [getProvider]);

  useEffect(() => {
    if (typeof web3Provider === "undefined") return;

    const chainChangedHandler = async (chainId: number) => {
      try {
        // console.log(ChainInfo[chainIdHex].chain)
        if (!isSupportedNetwork(chainId)) throw new UnsupportedNetworkError(chainId);
        await changeNetwork(chainId);
      } catch (e) {
        // Clear provider/signer when user selects an unsupported network
        await updateProviderOrSigner(undefined);
        console.warn("An unsupported network has been selected.", e);
        throw e;
      }
    };
    // if(!web3Provider.provider.on){return}
    web3Provider.provider.on("accountsChanged", accountsChanged);
    web3Provider.provider.on("chainChanged", chainChangedHandler);

    const initialiseWallet = async () => {
      try {
        const provider = getProvider();
        if (!provider) return;
        const [web3Network, appNetwork] = await Promise.all([web3Provider.getNetwork(), provider.getNetwork()]);
        if (web3Network.chainId === appNetwork.chainId) updateProviderOrSigner(web3Provider.getSigner());
      } catch (e) {
        if (e instanceof NoMetaMaskError) {
          console.warn(e.message);
        } else {
          throw e;
        }
      }
    };
    initialiseWallet();

    // return () => {
    //   if (!web3Provider) return;
    //   web3Provider.provider.off("chainChanged").off("accountsChanged");
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3Provider]);

  // Irrelevant
  const upgradeToMagicSigner = async () => {
    if (providerType === SIGNER_TYPE.MAGIC) return;
    return initialiseMagicSigner();
  };
  // Irrelevant

  return (
    <ProviderContext.Provider
      value={{
        providerType,
        getWeb3Modal,
        setWeb3Provider,
        logout,
        upgradeToMagicSigner,
        changeNetwork,
        reloadNetwork,
        getProvider,
        getTransactor,
        getSigner,
        supportedChainInfoObjects,
        currentChainId,
      }}
    >
      {children}
    </ProviderContext.Provider>
  );
};

export const useProviderContext = (): ProviderContextProps => useContext<ProviderContextProps>(ProviderContext);
