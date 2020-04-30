import React, { FunctionComponent } from "react";
import { AddressInfo } from "../../AddressInfo";
import { ExternalLinkEtherscanAddress, ExternalLinkEtherscanToken } from "../../UI/ExternalLink";

interface AssetInformationPanel {
  tokenRegistryAddress: string;
  tokenId: string;
}

export const AssetInformationPanel: FunctionComponent<AssetInformationPanel> = ({ tokenId, tokenRegistryAddress }) => {
  return (
    <div className="py-3">
      <AddressInfo title="BL information">
        <>
          <div>
            <ExternalLinkEtherscanAddress name="View BL Registry" address={tokenRegistryAddress} />
          </div>
          <div>
            <ExternalLinkEtherscanToken
              name="View Endorsement Chain"
              tokenId={tokenId}
              tokenRegistryAddress={tokenRegistryAddress}
            />
          </div>
        </>
      </AddressInfo>
    </div>
  );
};
