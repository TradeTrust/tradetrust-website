import { useState, useEffect, useCallback } from "react";
import { providers, Signer } from "ethers";
import { TitleEscrowFactory } from "@govtechsg/token-registry";
import { TitleEscrow } from "@govtechsg/token-registry/types/TitleEscrow";
import { TradeTrustErc721 } from "@govtechsg/token-registry/types/TradeTrustErc721";

export const useTitleEscrowContract = (
  provider: providers.Provider | Signer,
  tokenRegistry?: TradeTrustErc721,
  tokenId?: string
) => {
  const [titleEscrow, setTitleEscrow] = useState<TitleEscrow>();
  const [titleEscrowOwner, setTitleEscrowOwner] = useState<string>();

  const updateTitleEscrow = useCallback(async () => {
    if (!tokenRegistry || !tokenId) return;
    const titleEscrowAddress = await tokenRegistry.ownerOf(tokenId);
    setTitleEscrowOwner(titleEscrowAddress);
    const instance = TitleEscrowFactory.connect(titleEscrowAddress, provider);
    setTitleEscrow(instance);
  }, [provider, tokenId, tokenRegistry]);

  const reset = useCallback(() => {
    setTitleEscrow(undefined);
    setTitleEscrowOwner(undefined);
  }, [setTitleEscrow, setTitleEscrowOwner]);

  useEffect(() => {
    updateTitleEscrow();
    return () => {
      setTitleEscrow(undefined);
      setTitleEscrowOwner(undefined);
    };
  }, [updateTitleEscrow, tokenId, provider]);

  return { titleEscrow, updateTitleEscrow, titleEscrowOwner, reset };
};
