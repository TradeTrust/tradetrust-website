import React, { FunctionComponent } from "react";
import { AddressInfo } from "../../AddressInfo";
import { ExternalLink } from "../../UI/ExternalLink";
import { makeEtherscanAddressURL, makeEtherscanTokenURL } from "../../../utils";

interface AssetInformationPanel {
  tokenRegistryAddress: string;
  tokenId: string;
}

export const AssetInformationPanel: FunctionComponent<AssetInformationPanel> = ({ tokenId, tokenRegistryAddress }) => {
  const tokenRegistryHref = makeEtherscanAddressURL(tokenRegistryAddress);
  const tokenHistoryHref = makeEtherscanTokenURL({ registryAddress: tokenRegistryAddress, tokenId });

  return (
    <div className="py-3">
      <AddressInfo title="BL information">
        <>
          <ExternalLink name="View BL Registry" address={tokenRegistryHref} />
          <br />
          <ExternalLink name="View Endorsement Chain" address={tokenHistoryHref} />
        </>
      </AddressInfo>
    </div>
  );
};
