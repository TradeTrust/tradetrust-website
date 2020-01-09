import React, { FunctionComponent, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getData, SignedDocument } from "@govtechsg/open-attestation";
import { hexToNumberString } from "web3-utils";
import TokenSideBar from "./TokenSideBar";
import { ETHERSCAN_BASE_URL } from "../../config";
import { getTokenUserAddress } from "../../reducers/token";

interface ERC721TokenParameters {
  registryAddress: string;
  tokenId: string;
}

const makeEtherscanTokenURL = ({ registryAddress, tokenId }: ERC721TokenParameters) => {
  const tokenIdDecimal = hexToNumberString(tokenId);
  return `${ETHERSCAN_BASE_URL}token/${registryAddress}?a=${tokenIdDecimal}`;
};

const getAssetInfo = (document: SignedDocument) => {
  const { tokenRegistry } = getData(document).issuers[0];
  const { merkleRoot: tokenId } = document.signature;
  return { tokenRegistry, tokenId };
};

export const AssetInfo: FunctionComponent<{ document: SignedDocument }> = ({ document }) => {
  const [isSideBarExpand, toggleSideBar] = useState(false);
  const dispatch = useDispatch();
  const { tokenRegistry: registryAddress, tokenId } = getAssetInfo(document);

  useEffect(() => {
    if (registryAddress) {
      dispatch(getTokenUserAddress());
    }
  }, [dispatch, document, registryAddress]);

  const { beneficiaryAddress, holderAddress } = useSelector((state: any) => ({
    beneficiaryAddress: state.token.beneficiaryAddress,
    holderAddress: state.token.holderAddress
  }));

  const handlerToggleSideBar = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    toggleSideBar(!isSideBarExpand);
  };

  if (!registryAddress) return null;

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
