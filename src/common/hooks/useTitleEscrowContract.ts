import { useState, useEffect, useCallback } from "react";
import { providers, Signer } from "ethers";
import { TitleEscrowFactory__factory, TitleEscrow__factory } from "@govtechsg/token-registry/contracts";
import { TitleEscrow } from "@govtechsg/token-registry/contracts";
import { TradeTrustToken } from "@govtechsg/token-registry/contracts";
import { BurnAddress } from "../../constants/chain-info";

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
    const titleEscrowOwner = await tokenRegistry.ownerOf(tokenId);
    setDocumentOwner(titleEscrowOwner);
    const instance = await connectToTitleEscrow({
      provider,
      tokenRegistry,
      tokenId,
    });
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

export const retrieveTitleEscrowAddressOnFactory = async (
  tokenRegistry: TradeTrustToken,
  tokenId: string,
  signer: providers.Provider | Signer
): Promise<string> => {
  const titleEscrowFactoryAddress = await tokenRegistry.titleEscrowFactory();
  const tokenRegistryAddress = await tokenRegistry.address;
  const titleEscrowFactory = TitleEscrowFactory__factory.connect(titleEscrowFactoryAddress, signer);
  const titleEscrowAddress = await titleEscrowFactory.getAddress(tokenRegistryAddress, tokenId);
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
  const inactiveEscrow = [BurnAddress, tokenRegistryAddress].includes(titleEscrowOwner);
  let titleEscrowAddress = titleEscrowOwner;
  if (inactiveEscrow) {
    titleEscrowAddress = await retrieveTitleEscrowAddressOnFactory(tokenRegistry, tokenId, provider);
  }
  return TitleEscrow__factory.connect(titleEscrowAddress, provider);
};
