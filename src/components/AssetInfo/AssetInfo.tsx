import React, { FunctionComponent } from "react";
import { hexToNumberString } from "web3-utils";

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
    </div>
  );
};
