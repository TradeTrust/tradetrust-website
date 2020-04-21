import React, { FunctionComponent } from "react";
import { getData, WrappedDocument } from "@govtechsg/open-attestation";
import { makeEtherscanTokenURL } from "../../utils";
import { FeatureFlag } from "../FeatureFlag";

const getAssetInfo = (document: WrappedDocument) => {
  const { tokenRegistry } = getData(document).issuers[0];
  const { merkleRoot: tokenId } = document.signature;
  return { tokenRegistry, tokenId };
};

export const AssetInfo: FunctionComponent<{
  document: WrappedDocument;
  isSidebarVisible: boolean;
  toggleSidebar: (val: boolean) => void;
}> = ({ document, isSidebarVisible, toggleSidebar }) => {
  const { tokenRegistry: registryAddress, tokenId } = getAssetInfo(document);
  const setSidebar = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    toggleSidebar(!isSidebarVisible);
  };

  if (!registryAddress) return null;

  const legacyView = (
    <a
      href={makeEtherscanTokenURL({ registryAddress, tokenId })}
      id="asset-info-etherscan-link"
      rel="noreferrer noopener"
      target="_blank"
    >
      Manage Asset
    </a>
  );
  return (
    <FeatureFlag name="MANAGE_ASSET" fallback={legacyView}>
      <a href="#" id="asset-info-etherscan" rel="noreferrer noopener" target="_blank" onClick={setSidebar}>
        Manage Asset
      </a>
    </FeatureFlag>
  );
};
