import { MessageTitle } from "@govtechsg/tradetrust-ui-components";
import { ethers, providers, Signer } from "ethers";
import React, { createContext, FunctionComponent, useContext, useEffect, useState } from "react";
import { INFURA_API_KEY, NETWORK_NAME } from "../../config";
// import { utils } from "@govtechsg/oa-verify";
import { magic } from "./helpers";

export enum SIGNER_TYPE {
  IDENTITY,
  METAMASK,
  MAGIC,
}

const getProvider =
  NETWORK_NAME === "local"
    ? new providers.JsonRpcProvider()
    : // : utils.generateProvider({ network: NETWORK_NAME, providerType: "infura", apiKey: INFURA_API_KEY });
      new ethers.providers.InfuraProvider(NETWORK_NAME, INFURA_API_KEY);

interface ProviderContextProps {
  providerType: SIGNER_TYPE;
  provider: providers.Provider | Signer;
  upgradeToMetaMaskSigner: () => Promise<void>;
  upgradeToMagicSigner: () => Promise<void>;
  account?: string;
}

export const ProviderContext = createContext<ProviderContextProps>({
  providerType: SIGNER_TYPE.IDENTITY,
  provider: getProvider,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  upgradeToMetaMaskSigner: async () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  upgradeToMagicSigner: async () => {},
  account: undefined,
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
}

export const ProviderContextProvider: FunctionComponent<ProviderContextProviderProps> = ({ children }) => {
  const [providerType, setProviderType] = useState(SIGNER_TYPE.IDENTITY);
  const [provider, setProvider] = useState<providers.Provider | Signer>(getProvider);
  const [account, setAccount] = useState<string>();

  const initializeMetaMaskSigner = async () => {
    const { ethereum, web3 } = window;

    const metamaskExtensionNotFound = typeof ethereum === "undefined" || typeof web3 === "undefined";
    if (metamaskExtensionNotFound) throw new Error(MessageTitle.NO_METAMASK);

    await ethereum.enable();
    const injectedWeb3 = ethereum || web3.currentProvider;
    if (!injectedWeb3) throw new Error("No injected web3 provider found");
    const web3provider = new ethers.providers.Web3Provider(injectedWeb3);
    const signer = web3provider.getSigner();
    const web3account = (await web3provider.listAccounts())[0];

    setProvider(signer);
    setProviderType(SIGNER_TYPE.METAMASK);
    setAccount(web3account);
  };

  const initialiseMagicSigner = async () => {
    // needs to be cast as any before https://github.com/magiclabs/magic-js/issues/83 has been merged.
    const magicProvider = new ethers.providers.Web3Provider(magic.rpcProvider as any);
    const signer = magicProvider.getSigner();
    const address = await signer.getAddress();

    setProvider(signer);
    setProviderType(SIGNER_TYPE.MAGIC);
    setAccount(address);

    // const balance = ethers.utils.formatEther(
    //   await provider.getBalance(account) // Balance is in wei
    // );

    // console.log("BALANCE" + balance);
  };

  const upgradeToMetaMaskSigner = async () => {
    if (providerType === SIGNER_TYPE.METAMASK) return;
    return initializeMetaMaskSigner();
  };

  const upgradeToMagicSigner = async () => {
    if (providerType === SIGNER_TYPE.MAGIC) return;
    return initialiseMagicSigner();
  };

  useEffect(() => {
    // Do not listen before the provider is upgraded by the app
    if (providerType !== SIGNER_TYPE.METAMASK) return;
    window.ethereum.on("accountsChanged", () => {
      return initializeMetaMaskSigner();
    });
  }, [providerType]);

  return (
    <ProviderContext.Provider
      value={{ provider, providerType, upgradeToMetaMaskSigner, upgradeToMagicSigner, account }}
    >
      {children}
    </ProviderContext.Provider>
  );
};

export const useProviderContext = (): ProviderContextProps => useContext<ProviderContextProps>(ProviderContext);

// import { MessageTitle } from "@govtechsg/tradetrust-ui-components";
// import { ethers, providers, Signer } from "ethers";
// import React, { createContext, FunctionComponent, useContext, useEffect, useState } from "react";
// import { INFURA_API_KEY, NETWORK_NAME } from "../../config";
// import { utils } from "@govtechsg/oa-verify";

// const getProvider =
//   NETWORK_NAME === "local"
//     ? new providers.JsonRpcProvider()
//     : utils.generateProvider({ network: NETWORK_NAME, providerType: "infura", apiKey: INFURA_API_KEY });

// interface ProviderContextProps {
//   isUpgraded: boolean;
//   provider: providers.Provider | Signer;
//   upgradeProvider: () => Promise<void>;
//   account?: string;
// }

// export const ProviderContext = createContext<ProviderContextProps>({
//   isUpgraded: false,
//   provider: getProvider,
//   // eslint-disable-next-line @typescript-eslint/no-empty-function
//   upgradeProvider: async () => {},
//   account: undefined,
// });

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

// interface ProviderContextProviderProps {
//   children: React.ReactNode;
// }

// export const ProviderContextProvider: FunctionComponent<ProviderContextProviderProps> = ({ children }) => {
//   const [isUpgraded, setIsUpgraded] = useState(false);
//   const [provider, setProvider] = useState<providers.Provider | Signer>(getProvider);
//   const [account, setAccount] = useState<string>();

//   const initializeSigner = async () => {
//     const { ethereum, web3 } = window;

//     const metamaskExtensionNotFound = typeof ethereum === "undefined" || typeof web3 === "undefined";
//     if (metamaskExtensionNotFound) throw new Error(MessageTitle.NO_METAMASK);

//     await ethereum.enable();
//     const injectedWeb3 = ethereum || web3.currentProvider;
//     if (!injectedWeb3) throw new Error("No injected web3 provider found");
//     const web3provider = new ethers.providers.Web3Provider(injectedWeb3);
//     const signer = web3provider.getSigner();
//     const web3account = (await web3provider.listAccounts())[0];

//     setProvider(signer);
//     setIsUpgraded(true);
//     setAccount(web3account);
//   };

//   const upgradeProvider = async () => {
//     if (isUpgraded) return;
//     return initializeSigner();
//   };

//   useEffect(() => {
//     // Do not listen before the provider is upgraded by the app
//     if (!isUpgraded) return;
//     window.ethereum.on("accountsChanged", () => {
//       return initializeSigner();
//     });
//   }, [isUpgraded]);

//   return (
//     <ProviderContext.Provider value={{ isUpgraded, provider, upgradeProvider, account }}>
//       {children}
//     </ProviderContext.Provider>
//   );
// };

// export const useProviderContext = (): ProviderContextProps => useContext<ProviderContextProps>(ProviderContext);
