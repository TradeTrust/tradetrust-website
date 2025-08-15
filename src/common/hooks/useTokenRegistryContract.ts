import { v5Contracts, v4Contracts } from "@trustvc/trustvc";
import { providers, Signer } from "ethers";
import { useEffect, useState } from "react";
import { TradeTrustToken } from "../../types";
import { TokenRegistryVersions } from "../../constants";
import { useTokenRegistryVersion } from "./useTokenRegistryVersion";
const { TradeTrustToken__factory } = v5Contracts;
const { TradeTrustToken__factory: TradeTrustToken__factoryV4 } = v4Contracts;

export const useTokenRegistryContract = (
  address?: string,
  provider?: providers.Provider | Signer
): {
  tokenRegistry?: TradeTrustToken;
} => {
  const [tokenRegistry, setTokenRegistry] = useState<TradeTrustToken>();
  const tokenRegistryVersion = useTokenRegistryVersion();

  useEffect(() => {
    if (!address || !provider || !tokenRegistryVersion) return;

    const instance =
      tokenRegistryVersion === TokenRegistryVersions.V4
        ? TradeTrustToken__factoryV4.connect(address, provider)
        : TradeTrustToken__factory.connect(address, provider);
    setTokenRegistry(instance);
    return () => {
      setTokenRegistry(undefined);
    };
  }, [address, provider, tokenRegistryVersion]);

  return { tokenRegistry };
};
