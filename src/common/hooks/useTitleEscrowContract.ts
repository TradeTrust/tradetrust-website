import { useState, useEffect, useCallback } from "react";
import { providers, Signer } from "ethers";
import { v5Contracts, getTitleEscrowAddress } from "@trustvc/trustvc";
import { BurnAddress } from "../../constants/chain-info";
const { TitleEscrowFactory__factory, TitleEscrow__factory } = v5Contracts;
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
      console.log("updateTitleEscrow");
      const provider = (
        "provider" in providerOrSigner ? providerOrSigner.provider : providerOrSigner
      ) as providers.Provider;
      console.log("provider", provider);
      const titleEscrowOwner = await tokenRegistry.ownerOf(tokenId);
      console.log("titleEscrowOwner", titleEscrowOwner);
      setDocumentOwner(titleEscrowOwner);
      const address = await getTitleEscrowAddress(tokenRegistry.address, tokenId, provider);
      console.log("address", address);
      const instance = TitleEscrow__factory.connect(address, providerOrSigner);
      console.log("instance", instance);
      // const instance = await connectToTitleEscrow({
      //   provider,
      //   tokenRegistry,
      //   tokenId,
      // });
      setTitleEscrow(instance);
      setTitleEscrowAddress(instance.address);
    } catch (error) {
      console.error("error in updateTitleEscrow", error);
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

export const retrieveTitleEscrowAddressOnFactory = async (
  tokenRegistry: TradeTrustToken,
  tokenId: string,
  signer: providers.Provider | Signer
): Promise<string> => {
  const titleEscrowFactoryAddress = await tokenRegistry.titleEscrowFactory();
  const tokenRegistryAddress = await tokenRegistry.address;
  const titleEscrowFactory = TitleEscrowFactory__factory.connect(titleEscrowFactoryAddress, signer);
  const titleEscrowAddress = await titleEscrowFactory.getEscrowAddress(tokenRegistryAddress, tokenId);
  return titleEscrowAddress;
};

interface ConnectToTitleEscrowArgs {
  provider: providers.Provider | Signer;
  tokenRegistry: TradeTrustToken;
  tokenId: string;
}

export const connectToTitleEscrow = async ({
  provider,
  tokenRegistry,
  tokenId,
}: ConnectToTitleEscrowArgs): Promise<TitleEscrow> => {
  const tokenRegistryAddress = tokenRegistry.address;
  const titleEscrowOwner = await tokenRegistry.ownerOf(tokenId);
  const inactiveEscrow = [BurnAddress, tokenRegistryAddress]
    .map((s) => s.toLowerCase())
    .includes(titleEscrowOwner.toLowerCase());
  let titleEscrowAddress = titleEscrowOwner;
  if (inactiveEscrow) {
    titleEscrowAddress = await retrieveTitleEscrowAddressOnFactory(tokenRegistry, tokenId, provider);
  }
  return TitleEscrow__factory.connect(titleEscrowAddress, provider);
};
