import { useState, useEffect, useCallback } from "react";
import { providers, Signer } from "ethers";
import { TitleEscrowCloneableFactory } from "@govtechsg/token-registry";
import { TitleEscrowCloneable } from "@govtechsg/token-registry";
import { TradeTrustERC721 } from "@govtechsg/token-registry";

interface useTitleEscrowContractProps {
  titleEscrow?: TitleEscrowCloneable;
  documentOwner?: string;
  updateTitleEscrow: () => Promise<void>;
}

export const useTitleEscrowContract = (
  provider: providers.Provider | Signer | undefined,
  tokenRegistry?: TradeTrustERC721,
  tokenId?: string
): useTitleEscrowContractProps => {
  const [titleEscrow, setTitleEscrow] = useState<TitleEscrowCloneable>();
  const [documentOwner, setDocumentOwner] = useState<string>();

  const updateTitleEscrow = useCallback(async () => {
    if (!tokenRegistry || !tokenId || !provider) return;
    const titleEscrowAddress = await tokenRegistry.ownerOf(tokenId);
    setDocumentOwner(titleEscrowAddress);
    const instance = TitleEscrowCloneableFactory.connect(titleEscrowAddress, provider);
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
