import { useState, useEffect, useCallback } from "react";
import { useTokenRegistryContract } from "./useTokenRegistryContract";
import { providers, Signer } from "ethers";
import { TitleEscrowFactory } from "@govtechsg/token-registry";
import { TitleEscrow } from "@govtechsg/token-registry/types/TitleEscrow";

export const useTitleEscrowContract = (
  tokenRegistryAddress: string,
  tokenId: string,
  provider: providers.Provider | Signer
) => {
  const [titleEscrow, setTitleEscrow] = useState<TitleEscrow>();
  const { tokenRegistry } = useTokenRegistryContract(tokenRegistryAddress, provider);

  const updateTitleEscrow = useCallback(async () => {
    if (!tokenRegistry) return;
    const titleEscrowAddress = await tokenRegistry.ownerOf(tokenId);
    const instance = TitleEscrowFactory.connect(titleEscrowAddress, provider);
    setTitleEscrow(instance);
  }, [provider, tokenId, tokenRegistry]);

  useEffect(() => {
    updateTitleEscrow();
  }, [tokenRegistry, tokenId, provider, updateTitleEscrow]);

  return { titleEscrow, updateTitleEscrow };
};
