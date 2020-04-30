import React from "react";
import { WrappedDocument } from "@govtechsg/open-attestation";
import { getDocumentId, getTokenRegistryAddress } from "../../../common/utils/document";
import { useTitleEscrowContract } from "../../../common/hooks/useTitleEscrowContract";
import { useProviderContext } from "../../../common/contexts/provider";
import { AssetManagementApplication } from "./../AssetManagementApplication";

export const AssetManagementContainer = ({ document }: { document: WrappedDocument }) => {
  const tokenId = getDocumentId(document);
  const tokenRegistryAddress = getTokenRegistryAddress(document);
  const { provider } = useProviderContext();
  const { titleEscrow } = useTitleEscrowContract(tokenRegistryAddress, tokenId, provider);

  if (!titleEscrow) return null;

  return (
    <AssetManagementApplication
      tokenId={tokenId}
      tokenRegistryAddress={tokenRegistryAddress}
      titleEscrow={titleEscrow}
    />
  );
};
