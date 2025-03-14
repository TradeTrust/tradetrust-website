import { v5Contracts } from "@trustvc/trustvc";
import { providers, Signer } from "ethers";
import { useEffect, useState } from "react";
const { TradeTrustToken__factory } = v5Contracts;
type TradeTrustToken = typeof v5Contracts.TradeTrustToken;

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
