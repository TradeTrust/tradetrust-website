import { useState, useEffect } from "react";
import { TradeTrustERC721 } from "@govtechsg/token-registry";
import { TradeTrustERC721 as V2TradeTrustERC721 } from "@govtechsg/token-registry-v2/dist/ts/contracts";
import { providers, Signer } from "ethers";
import { getConnectedTokenRegistry, TradeTrustVersion } from "../utils/connectTokenRegistry";

export const useTokenRegistryContract = (
  address?: string,
  provider?: providers.Provider | Signer
): {
  tokenRegistry?: TradeTrustERC721 | V2TradeTrustERC721;
  tokenRegistryVersion?: TradeTrustVersion;
} => {
  const [tokenRegistry, setTokenRegistry] = useState<TradeTrustERC721 | V2TradeTrustERC721>();
  const [tokenRegistryVersion, setTokenRegistryVersion] = useState<TradeTrustVersion>();

  useEffect(() => {
    if (!address || !provider) return;
    const setAndConnectTokenRegistry = async () => {
      const { contract, version } = await getConnectedTokenRegistry(provider, address);
      setTokenRegistry(contract);
      setTokenRegistryVersion(version);
    };
    setAndConnectTokenRegistry();
    return () => {
      setTokenRegistry(undefined);
      setTokenRegistryVersion(undefined);
    };
  }, [address, provider]);

  return { tokenRegistry, tokenRegistryVersion };
};
