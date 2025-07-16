import { useState, useEffect, useCallback } from "react";
import { providers, Signer } from "ethers";
import { getTitleEscrowAddress, v5Contracts } from "@trustvc/trustvc";
const { TitleEscrow__factory } = v5Contracts;
type TitleEscrow = typeof v5Contracts.TitleEscrow;
type TradeTrustToken = typeof v5Contracts.TradeTrustToken;
interface useTitleEscrowContractProps {
  titleEscrow?: TitleEscrow;
  titleEscrowAddress?: string;
  documentOwner?: string;
  updateTitleEscrow: () => Promise<void>;
}

export const useTitleEscrowContract = (
  providerOrSigner: providers.Provider | Signer | undefined,
  tokenRegistry?: TradeTrustToken,
  tokenId?: string
): useTitleEscrowContractProps => {
  const [titleEscrow, setTitleEscrow] = useState<TitleEscrow>();
  const [titleEscrowAddress, setTitleEscrowAddress] = useState<string>();
  const [documentOwner, setDocumentOwner] = useState<string>();

  const updateTitleEscrow = useCallback(async () => {
    if (!tokenRegistry || !tokenId || !providerOrSigner) return;

    try {
      const provider = (
        "provider" in providerOrSigner ? providerOrSigner.provider : providerOrSigner
      ) as providers.Provider;
      const titleEscrowOwner = await tokenRegistry.ownerOf(tokenId);
      setDocumentOwner(titleEscrowOwner);
      const address = await getTitleEscrowAddress(tokenRegistry.address, tokenId, provider);
      const instance = TitleEscrow__factory.connect(address, providerOrSigner);
      setTitleEscrow(instance);
      setTitleEscrowAddress(address);
    } catch (error) {
      setTitleEscrow(undefined);
      setTitleEscrowAddress(undefined);
    }
  }, [providerOrSigner, tokenId, tokenRegistry]);

  useEffect(() => {
    updateTitleEscrow();
    return () => {
      setTitleEscrow(undefined);
      setDocumentOwner(undefined);
      setTitleEscrowAddress(undefined);
    };
  }, [updateTitleEscrow, tokenId, providerOrSigner]);

  return { titleEscrow, titleEscrowAddress, updateTitleEscrow, documentOwner };
};
