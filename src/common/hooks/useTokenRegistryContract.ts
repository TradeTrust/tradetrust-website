import { useState, useEffect } from "react";
import { TradeTrustToken__factory } from "@govtechsg/token-registry/contracts";
import { TradeTrustToken } from "@govtechsg/token-registry/contracts";
import { providers, Signer } from "ethers";

export const useTokenRegistryContract = (
  address?: string,
  provider?: providers.Provider | Signer
): {
  tokenRegistry?: TradeTrustToken;
} => {
  const [tokenRegistry, setTokenRegistry] = useState<TradeTrustToken>();

  useEffect(() => {
    if (!address || !provider) return;
    const instance = TradeTrustToken__factory.connect(address, provider);
    setTokenRegistry(instance);
    return () => {
      setTokenRegistry(undefined);
    };
  }, [address, provider]);

  return { tokenRegistry };
};
