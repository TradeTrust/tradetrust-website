import { useState, useEffect, useCallback } from "react";
import { useTokenRegistryContract } from "./useTokenRegistryContract";
import { providers, Signer } from "ethers";
import { TitleEscrowFactory } from "@govtechsg/token-registry";
import { TitleEscrow } from "@govtechsg/token-registry/types/TitleEscrow";

export const useTitleEscrowContract = (
  tokenRegistryAddress: string | undefined,
  tokenId: string | undefined,
  provider: providers.Provider | Signer
) => {
  const [titleEscrow, setTitleEscrow] = useState<TitleEscrow>();
  const [titleEscrowOwner, setTitleEscrowOwner] = useState<string>();
  const { tokenRegistry } = useTokenRegistryContract(tokenRegistryAddress, provider);

  const reset = useCallback(() => {
    setTitleEscrow(undefined);
    setTitleEscrowOwner(undefined);
  }, []);

  const updateTitleEscrow = useCallback(async () => {
    if (!tokenRegistry || !tokenId) return;
    const titleEscrowAddress = await tokenRegistry.ownerOf(tokenId);
    setTitleEscrowOwner(titleEscrowAddress);
    const instance = TitleEscrowFactory.connect(titleEscrowAddress, provider);
    setTitleEscrow(instance);
  }, [provider, tokenId, tokenRegistry]);

  useEffect(() => {
    updateTitleEscrow();
  }, [tokenRegistry, tokenId, provider, updateTitleEscrow]);

  return { titleEscrow, updateTitleEscrow, titleEscrowOwner, reset };
};
