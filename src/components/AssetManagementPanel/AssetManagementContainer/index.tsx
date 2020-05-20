import React from "react";
import { WrappedDocument } from "@govtechsg/open-attestation";
import { getDocumentId, getTokenRegistryAddress } from "../../../common/utils/document";
import { AssetManagementApplication } from "./../AssetManagementApplication";

export const AssetManagementContainer = ({ document }: { document: WrappedDocument }) => {
  const tokenId = getDocumentId(document);
  const tokenRegistryAddress = getTokenRegistryAddress(document);

  return <AssetManagementApplication tokenId={tokenId} tokenRegistryAddress={tokenRegistryAddress} />;
};
