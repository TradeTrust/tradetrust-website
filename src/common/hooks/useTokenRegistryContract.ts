import { useState, useEffect } from "react";
import { TradeTrustERC721Factory } from "@govtechsg/token-registry";
import { TradeTrustERC721 } from "@govtechsg/token-registry/types/TradeTrustERC721";
import { providers } from "ethers";

export const useTokenRegistryContract = (address: string, provider: providers.Provider) => {
  const [tokenRegistry, setTokenRegistry] = useState<TradeTrustERC721>();

  useEffect(() => {
    const instance = TradeTrustERC721Factory.connect(address, provider);
    setTokenRegistry(instance);
  }, [address, provider]);

  return { tokenRegistry };
};
