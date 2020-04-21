import React, { ReactElement } from "react";
import { TitleEscrow } from "@govtechsg/token-registry/types/TitleEscrow";
import { TradeTrustERC721 } from "@govtechsg/token-registry/types/TradeTrustERC721";
import { WrappedDocument } from "@govtechsg/open-attestation";
import { useTitleEscrowContract } from "../hooks/useTitleEscrowContract";
import { useTokenRegistryContract } from "../hooks/useTokenRegistryContract";
import { getDocumentId, getTokenRegistryAddress } from "../utils/document";
import { useDefaultProvider } from "../hooks/useDefaultProvider";

interface TokenContextType {
  titleEscrow?: TitleEscrow;
  tokenRegistry?: TradeTrustERC721;
}

export const TokenContext = React.createContext({} as TokenContextType);

export const TokenProvider = ({ document, children }: { document: WrappedDocument; children: ReactElement }) => {
  const tokenId = getDocumentId(document);
  const tokenRegistryAddress = getTokenRegistryAddress(document);

  const { provider } = useDefaultProvider(); // Component only need read only access
  const { tokenRegistry } = useTokenRegistryContract(tokenRegistryAddress, provider);
  const { titleEscrow } = useTitleEscrowContract(tokenRegistryAddress, tokenId, provider);

  return <TokenContext.Provider value={{ tokenRegistry, titleEscrow }}>{children}</TokenContext.Provider>;
};
