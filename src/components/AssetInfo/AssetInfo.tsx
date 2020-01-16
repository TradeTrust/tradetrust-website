import React, { FunctionComponent, useState } from "react";
import TokenSideBar from "./TokenSideBar";
import { makeEtherscanTokenURL } from "../../utils";

interface ERC721TokenParameters {
  registryAddress: string;
  tokenId: string;
}

export const AssetInfo: FunctionComponent<ERC721TokenParameters> = ({ registryAddress, tokenId }) => {
  const [isSideBarExpand, toggleSideBar] = useState(false);

  const handlerToggleSideBar = (event: { preventDefault: () => void }) => {
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
