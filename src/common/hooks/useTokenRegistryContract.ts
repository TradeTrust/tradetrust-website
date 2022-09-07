import { useState, useEffect } from "react";
import { TradeTrustERC721__factory } from "@govtechsg/token-registry/contracts";
import { TradeTrustERC721 } from "@govtechsg/token-registry/contracts";
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
    const instance = TradeTrustERC721__factory.connect(address, provider);
    setTokenRegistry(instance);
    return () => {
      setTokenRegistry(undefined);
    };
  }, [address, provider]);

  return { tokenRegistry };
};
