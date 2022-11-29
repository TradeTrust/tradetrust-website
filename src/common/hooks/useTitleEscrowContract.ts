import { useState, useEffect, useCallback } from "react";
import { providers, Signer } from "ethers";
import { TitleEscrow__factory } from "@govtechsg/token-registry/contracts";
import { TitleEscrow } from "@govtechsg/token-registry/contracts";
import { TradeTrustToken } from "@govtechsg/token-registry/contracts";

interface useTitleEscrowContractProps {
  titleEscrow?: TitleEscrow;
  documentOwner?: string;
  updateTitleEscrow: () => Promise<void>;
}

export const useTitleEscrowContract = (
  provider: providers.Provider | Signer | undefined,
  tokenRegistry?: TradeTrustToken,
  tokenId?: string
): useTitleEscrowContractProps => {
  const [titleEscrow, setTitleEscrow] = useState<TitleEscrow>();
  const [documentOwner, setDocumentOwner] = useState<string>();

  const updateTitleEscrow = useCallback(async () => {
    if (!tokenRegistry || !tokenId || !provider) return;
    const titleEscrowAddress = await tokenRegistry.ownerOf(tokenId);
    setDocumentOwner(titleEscrowAddress);
    const instance = TitleEscrow__factory.connect(titleEscrowAddress, provider);
    setTitleEscrow(instance);
  }, [provider, tokenId, tokenRegistry]);

  useEffect(() => {
    updateTitleEscrow();
    return () => {
      setTitleEscrow(undefined);
      setDocumentOwner(undefined);
    };
  }, [updateTitleEscrow, tokenId, provider]);

  return { titleEscrow, updateTitleEscrow, documentOwner };
};
