import { Magic as MagicBase } from "magic-sdk";
import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { ChainId } from "../../constants/chain-info";
import { getChainInfo, isSupportedNetwork } from "../utils/chain-utils";

export type Magic = MagicBase;

interface NetworkConfig {
  chainId: number;
  rpcUrl: string;
}

type MagicContextType = {
  magic: Magic | null;
  changeMagicNetwork: (chainId: ChainId) => void;
  loginMagicLink: (email: string) => Promise<void>;
  logoutMagicLink: () => Promise<void>;
  isLoggedIn: boolean;
  revealPrivateKey: () => Promise<boolean>;
  selectedNetwork: NetworkConfig | undefined;
};

const MagicContext = createContext<MagicContextType>({
  magic: null,
  changeMagicNetwork: () => {},
  loginMagicLink: async () => {},
  logoutMagicLink: async () => {},
  isLoggedIn: false,
  revealPrivateKey: async () => false,
  selectedNetwork: undefined,
});

interface MagicProviderProps {
  children: ReactNode;
  defaultChainId: ChainId;
}

export const MagicProvider = ({ children, defaultChainId }: MagicProviderProps) => {
  const [magic, setMagic] = useState<Magic | null>(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const [selectedNetwork, setSelectedNetwork] = useState<NetworkConfig | undefined>(undefined);

  const changeMagicNetwork = (chainId: ChainId) => {
    try {
      const network = getChainInfo(chainId);
      if (!network?.rpcUrl) return;

      setSelectedNetwork({
        chainId: Number(chainId),
        rpcUrl: network.rpcUrl,
      });
    } catch (error) {
      console.error("Failed to change Magic network:", error);
    }
  };

  const loginMagicLink = async (email: string) => {
    if (!magic) return;

    await magic.auth.loginWithMagicLink({ email });
  };

  const revealPrivateKey = async () => {
    try {
      if (!magic || !isLoggedIn) return false;

      return await magic.user.revealPrivateKey();
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  };

  const logoutMagicLink = async () => {
    if (!magic) return;

    await magic.user.logout();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    if (isSupportedNetwork(defaultChainId)) {
      const network = getChainInfo(defaultChainId);
      if (!network) return;

      setSelectedNetwork({
        chainId: defaultChainId,
        rpcUrl: network.rpcUrl!,
      });
    }
  }, [defaultChainId]);

  useEffect(() => {
    if (!magic || !magic.user) return;
    magic.user.onUserLoggedOut(() => {
      setIsLoggedIn(false);
    });

    magic.user.isLoggedIn().then((_isLoggedIn: boolean) => {
      if (_isLoggedIn) {
        setIsLoggedIn(true);
      }
    });
  }, [magic]);

  useEffect(() => {
    if (!selectedNetwork) return;
    if (process.env.MAGIC_API_KEY) {
      const _magic = new MagicBase(process.env.MAGIC_API_KEY as string, {
        network: selectedNetwork,
        useStorageCache: true,
        // testMode: true,
      });

      setMagic(_magic);
    }
  }, [selectedNetwork]);

  return (
    <MagicContext.Provider
      value={{
        magic,
        changeMagicNetwork,
        loginMagicLink,
        logoutMagicLink,
        isLoggedIn,
        revealPrivateKey,
        selectedNetwork,
      }}
    >
      {children}
    </MagicContext.Provider>
  );
};

export default MagicProvider;

export const useMagicContext = (): MagicContextType => useContext(MagicContext);
