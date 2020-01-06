import React, { FunctionComponent, useState } from "react";
import { hexToNumberString } from "web3-utils";
import { default as TokenSidebar } from "./TokenSidebar";
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
  const [isSidebarExpand, toggleSidebar] = useState(false);

  const handlerToggleSideBar = event => {
    event.preventDefault();
    toggleSidebar(!isSidebarExpand);
  };

  return (
    <div>
      <a
        href={makeEtherscanTokenURL({ registryAddress, tokenId })}
        id="asset-info-etherscan-link"
        rel="noreferrer noopener"
        target="_blank"
        onClick={handlerToggleSideBar}
      >
        Manage Asset
      </a>
      <TokenSidebar
        handler={handlerToggleSideBar}
        isSidebarExpand={isSidebarExpand}
        registryAddress={registryAddress}
      />
    </div>
  );
};
