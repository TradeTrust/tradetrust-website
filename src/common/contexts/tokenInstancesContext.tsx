import React, { ReactElement } from "react";
import { TitleEscrow } from "@govtechsg/token-registry/types/TitleEscrow";
import { TradeTrustERC721 } from "@govtechsg/token-registry/types/TradeTrustERC721";
import { WrappedDocument } from "@govtechsg/open-attestation";
import { useTitleEscrowContract } from "../hooks/useTitleEscrowContract";
import { useTokenRegistryContract } from "../hooks/useTokenRegistryContract";
import { getDocumentId, getTokenRegistryAddress } from "../utils/document";
import { useDefaultProvider } from "../hooks/useDefaultProvider";

interface TokenInstanceContextType {
  titleEscrowInstance?: TitleEscrow;
  tokenRegistryInstance?: TradeTrustERC721;
}

export const TokenInstanceContext = React.createContext<TokenInstanceContextType>({
  titleEscrowInstance: undefined,
  tokenRegistryInstance: undefined,
});

export const TokenInstanceProvider = ({
  document,
  children,
}: {
  document: WrappedDocument;
  children: ReactElement;
}) => {
  const tokenId = getDocumentId(document);
  const tokenRegistryAddress = getTokenRegistryAddress(document);

  const { provider } = useDefaultProvider(); // Component only need read only access
  const tokenRegistryInstance = useTokenRegistryContract(tokenRegistryAddress, provider).tokenRegistry;
  const titleEscrowInstance = useTitleEscrowContract(tokenRegistryAddress, tokenId, provider).titleEscrow;

  return (
    <TokenInstanceContext.Provider value={{ tokenRegistryInstance, titleEscrowInstance }}>
      {children}
    </TokenInstanceContext.Provider>
  );
};
