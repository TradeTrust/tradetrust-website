import { useState, useEffect } from "react";
import { TradeTrustERC721Factory } from "@govtechsg/token-registry";
import { TradeTrustERC721 } from "@govtechsg/token-registry";
import { providers, Signer } from "ethers";

export const useTokenRegistryContract = (
  address?: string,
  provider?: providers.Provider | Signer
): {
  tokenRegistry?: TradeTrustERC721;
} => {
  const [tokenRegistry, setTokenRegistry] = useState<TradeTrustERC721>();

  useEffect(() => {
    if (!address || !provider) return;
    const instance = TradeTrustERC721Factory.connect(address, provider);
    setTokenRegistry(instance);
    return () => {
      setTokenRegistry(undefined);
    };
  }, [address, provider]);

  return { tokenRegistry };
};
