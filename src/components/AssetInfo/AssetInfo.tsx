import React, { FunctionComponent } from "react";
import { SignedDocument } from "@govtechsg/open-attestation";
import { makeEtherscanTokenURL } from "../../utils";
import { getAssetInfo } from "../../utils";

export const AssetInfo: FunctionComponent<{ document: SignedDocument }> = ({ document }) => {
  const { tokenRegistry: registryAddress, tokenId } = getAssetInfo(document);

  if (!registryAddress) return null;

  return (
    <>
      <a
        href={makeEtherscanTokenURL({ registryAddress, tokenId })}
        id="asset-info-etherscan-link"
        rel="noreferrer noopener"
        target="_blank"
      >
        Manage Asset
      </a>
    </>
  );
};
