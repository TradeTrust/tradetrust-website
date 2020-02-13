import React, { FunctionComponent } from "react";
import { SignedDocument } from "@govtechsg/open-attestation";
import { makeEtherscanTokenURL } from "../../utils";
import { getAssetInfo } from "../../utils";
import { FeatureFlag } from "../../components/FeatureFlag";

export const AssetInfo: FunctionComponent<{ document: SignedDocument; handleToggleSideBar?: any }> = ({
  document,
  handleToggleSideBar
}) => {
  const { tokenRegistry: registryAddress, tokenId } = getAssetInfo(document);

  if (!registryAddress) return null;

  return (
    <FeatureFlag
      name="MANAGE_ASSET"
      render={() => (
        <a href="#" id="asset-info-etherscan-link" onClick={handleToggleSideBar}>
          Manage Asset
        </a>
      )}
      fallback={() => (
        <a
          href={makeEtherscanTokenURL({ registryAddress, tokenId })}
          id="asset-info-etherscan-link"
          rel="noreferrer noopener"
          target="_blank"
        >
          Manage Asset
        </a>
      )}
    />
  );
};
