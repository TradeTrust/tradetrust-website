import { useState, useEffect } from "react";
import { TradeTrustERC721Factory } from "@govtechsg/token-registry";
import { TradeTrustERC721 } from "@govtechsg/token-registry/types/TradeTrustERC721";
import { Signer } from "ethers";
import { Provider } from "ethers/providers";

export const useTokenRegistryContract = (address: string, signerOrProvider: Signer | Provider) => {
  const [tokenRegistry, setTokenRegistry] = useState<TradeTrustERC721>();

  useEffect(() => {
    const instance = TradeTrustERC721Factory.connect(address, signerOrProvider);
    setTokenRegistry(instance);
  }, [address, signerOrProvider]);

  return { tokenRegistry };
};
