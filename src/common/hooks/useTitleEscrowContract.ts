import { useState, useEffect, useCallback } from "react";
import { providers, Signer } from "ethers";
import { getTitleEscrowAddress, v5Contracts, v4Contracts } from "@trustvc/trustvc";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { TitleEscrow, TradeTrustToken } from "../../types";
import { TokenRegistryVersions } from "../../constants";
const { TitleEscrow__factory } = v5Contracts;
const { TitleEscrow__factory: TitleEscrow__factoryV4 } = v4Contracts;
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
  const { tokenRegistryVersion } = useSelector((state: RootState) => {
    return state.certificate;
  });

  const updateTitleEscrow = useCallback(async () => {
    if (!tokenRegistry || !tokenId || !providerOrSigner || !tokenRegistryVersion) return;

    try {
      const provider = (
        "provider" in providerOrSigner ? providerOrSigner.provider : providerOrSigner
      ) as providers.Provider;
      const titleEscrowOwner = await tokenRegistry.ownerOf(tokenId);
      setDocumentOwner(titleEscrowOwner);
      const address = await getTitleEscrowAddress(tokenRegistry.address, tokenId, provider, {
        titleEscrowVersion: tokenRegistryVersion.toLowerCase() as "v4" | "v5",
      });
      let instance;
      if (tokenRegistryVersion === TokenRegistryVersions.V4) {
        instance = TitleEscrow__factoryV4.connect(address, providerOrSigner);
      } else {
        instance = TitleEscrow__factory.connect(address, providerOrSigner);
      }
      setTitleEscrow(instance);
      setTitleEscrowAddress(address);
    } catch (error) {
      setTitleEscrow(undefined);
      setTitleEscrowAddress(undefined);
    }
  }, [providerOrSigner, tokenId, tokenRegistry, tokenRegistryVersion]);

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
