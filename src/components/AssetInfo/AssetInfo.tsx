import React, { FunctionComponent, useState } from "react";
import { hexToNumberString } from "web3-utils";
import TokenSidebar from "./../UI/TokenSidebar/TokenSidebar";

import { ETHERSCAN_BASE_URL } from "../../config";

const makeEtherscanTokenURL = ({ registryAddress, tokenId }: ERC721TokenParameters) => {
  const tokenIdDecimal = hexToNumberString(tokenId);
  return `${ETHERSCAN_BASE_URL}token/${registryAddress}?a=${tokenIdDecimal}`;
};

interface ERC721TokenParameters {
  registryAddress: string;
  tokenId: string;
}

export const AssetInfo: FunctionComponent<ERC721TokenParameters> = ({ registryAddress, tokenId }) => {
  const [isTokenSidebarExpand, toggleSidebar] = useState(false);

  return (
    <div>
      <a
        href={makeEtherscanTokenURL({ registryAddress, tokenId })}
        id="asset-info-etherscan-link"
        rel="noreferrer noopener"
        target="_blank"
      >
        Manage Asset
      </a>
      <div onClick={() => toggleSidebar(!isTokenSidebarExpand)}>Manage Asset (click to test toggle sidebar)</div>
      <TokenSidebar />
    </div>
  );
};
