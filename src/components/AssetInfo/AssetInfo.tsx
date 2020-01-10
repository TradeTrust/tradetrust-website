import React, { FunctionComponent, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getData, SignedDocument } from "@govtechsg/open-attestation";
import TokenSideBar from "./TokenSideBar";
import { getTokenUserAddress } from "../../reducers/token";
import { makeEtherscanTokenURL } from "../../utils";

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

  const { holderAddress, beneficiaryAddress, approvedBeneficiaryAddress } = useSelector((state: any) => ({
    holderAddress: state.token.holderAddress,
    beneficiaryAddress: state.token.beneficiaryAddress,
    approvedBeneficiaryAddress: state.token.approvedBeneficiaryAddress
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
        holderAddress={holderAddress}
        beneficiaryAddress={beneficiaryAddress}
        approvedBeneficiaryAddress={approvedBeneficiaryAddress}
        registryAddress={registryAddress}
        handler={handlerToggleSideBar}
        isSideBarExpand={isSideBarExpand}
      />
    </div>
  );
};
