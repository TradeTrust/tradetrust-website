import React from "react";

import { useDefaultProvider } from "../../common/hooks/useDefaultProvider";
import { useTitleEscrowContract } from "../../common/hooks/useTitleEscrowContract";
import { getDocumentId, getTokenRegistryAddress } from "../../common/utils/document";
import { TitleTransferPanel } from "./TitleTransferPanel";

import { WrappedDocument } from "@govtechsg/open-attestation";

interface TitleTransferProps {
  document: WrappedDocument;
}

export const TitleTransferContainer = ({ document }: TitleTransferProps) => {
  const { provider } = useDefaultProvider(); // Component only need read only access
  const tokenRegistryAddress = getTokenRegistryAddress(document);
  const tokenId = getDocumentId(document);
  const { titleEscrow } = useTitleEscrowContract(tokenRegistryAddress, tokenId, provider);

  return <>{titleEscrow && <TitleTransferPanel titleEscrow={titleEscrow} document={document} />}</>;
};
