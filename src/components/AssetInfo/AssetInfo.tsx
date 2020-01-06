import React, { FunctionComponent, useState } from "react";
import { hexToNumberString } from "web3-utils";
import TokenSideBar from "./TokenSideBar";
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
  const [isSideBarExpand, toggleSideBar] = useState(false);

  const handlerToggleSideBar = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    toggleSideBar(!isSideBarExpand);
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
      <TokenSideBar
        handler={handlerToggleSideBar}
        isSideBarExpand={isSideBarExpand}
        registryAddress={registryAddress}
      />
    </div>
  );
};
