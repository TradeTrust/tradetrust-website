import { TradeTrustToken, TradeTrustToken__factory } from "@tradetrust-tt/token-registry/contracts";
import { providers, Signer } from "ethers";
import { useEffect, useState } from "react";

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
