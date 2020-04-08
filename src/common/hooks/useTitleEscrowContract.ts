import { useState, useEffect } from "react";
import { useTokenRegistryContract } from "./useTokenRegistryContract";
import { TitleEscrowFactory } from "@govtechsg/token-registry";
import { TitleEscrow } from "@govtechsg/token-registry/types/TitleEscrow";
import { Signer } from "ethers";

export const useTitleEscrowContract = (tokenRegistryAddress: string, tokenId: string, signer: Signer) => {
  const [titleEscrow, setTitleEscrow] = useState<TitleEscrow>();
  const { tokenRegistry } = useTokenRegistryContract(tokenRegistryAddress, signer);

  useEffect(() => {
    if (!tokenRegistry) return;
    const updateTitleEscrow = async () => {
      const titleEscrowAddress = await tokenRegistry.ownerOf(tokenId);
      const instance = TitleEscrowFactory.connect(titleEscrowAddress, signer);
      setTitleEscrow(instance);
    };
    updateTitleEscrow();
  }, [tokenRegistry, tokenId, signer]);

  return { titleEscrow };
};
