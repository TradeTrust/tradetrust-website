import { useState, useEffect, useCallback } from "react";
import { providers, Signer } from "ethers";
import { TitleEscrowCloneable } from "@govtechsg/token-registry";
import { TradeTrustERC721 } from "@govtechsg/token-registry";
import { TradeTrustERC721 as V2TradeTrustERC721 } from "@govtechsg/token-registry-v2/dist/ts/contracts";
import { TitleEscrow as V2TitleEscrowCloneable } from "@govtechsg/token-registry-v2/types/TitleEscrow";
import { TradeTrustVersion } from "../utils/connectTokenRegistry";
import { getConnectedTitleEscrow, getTitleEscrowAddress } from "../utils/connectTitleEscrow";
interface useTitleEscrowContractProps {
  titleEscrow?: TitleEscrowCloneable | V2TitleEscrowCloneable;
  documentOwner?: string;
  updateTitleEscrow: () => Promise<void>;
}

export const useTitleEscrowContract = (
  provider: providers.Provider | Signer | undefined,
  tokenRegistry?: TradeTrustERC721 | V2TradeTrustERC721,
  tokenId?: string,
  version?: TradeTrustVersion
): useTitleEscrowContractProps => {
  const [titleEscrow, setTitleEscrow] = useState<TitleEscrowCloneable | V2TitleEscrowCloneable>();
  const [documentOwner, setDocumentOwner] = useState<string>();

  const updateTitleEscrow = useCallback(async () => {
    if (!tokenRegistry || !tokenId || !provider || !version) return;
    const titleEscrowAddress = await getTitleEscrowAddress(tokenRegistry, provider, version, tokenId);
    setDocumentOwner(titleEscrowAddress);
    const { titleEscrowContract: instance } = await getConnectedTitleEscrow(titleEscrowAddress, provider, version);
    setTitleEscrow(instance);
  }, [provider, tokenId, tokenRegistry, version]);

  useEffect(() => {
    updateTitleEscrow();
    return () => {
      setTitleEscrow(undefined);
      setDocumentOwner(undefined);
    };
  }, [updateTitleEscrow, tokenId, provider]);

  return { titleEscrow, updateTitleEscrow, documentOwner };
};
