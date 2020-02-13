import React, { FunctionComponent, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SignedDocument } from "@govtechsg/open-attestation";
import { getTokenUserAddress, initializeToken } from "../../reducers/token";
import { loadAdminAddress } from "../../reducers/admin";
import { getAssetInfo } from "../../utils";

import TokenSideBar from "./TokenSideBar";

export const TokenSideBarContainer: FunctionComponent<{
  document: SignedDocument;
}> = ({ document }) => {
  const {
    adminAddress,
    holderAddress,
    beneficiaryAddress,
    approvedBeneficiaryAddress,
    initializeTokenSuccess
  } = useSelector((state: any) => ({
    adminAddress: state.admin.adminAddress,
    holderAddress: state.token.holderAddress,
    beneficiaryAddress: state.token.beneficiaryAddress,
    approvedBeneficiaryAddress: state.token.approvedBeneficiaryAddress,
    initializeTokenSuccess: state.token.initializeTokenSuccess,
    isEscrowContract: state.token.isEscrowContract
  }));

  const [isSideBarExpand, toggleSideBar] = useState(false);

  const dispatch = useDispatch();
  const { tokenRegistry: registryAddress } = getAssetInfo(document);

  useEffect(() => {
    if (registryAddress) dispatch(loadAdminAddress());
  }, [dispatch, document, registryAddress]);

  useEffect(() => {
    if (adminAddress) dispatch(initializeToken());
  }, [dispatch, adminAddress]);

  useEffect(() => {
    if (initializeTokenSuccess) dispatch(getTokenUserAddress());
  }, [dispatch, initializeTokenSuccess]);

  const handleToggleSideBar = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    toggleSideBar(!isSideBarExpand);
  };

  if (!registryAddress) return null;

  return (
    <>
      <a href="#" id="asset-info-etherscan-link" onClick={handleToggleSideBar}>
        Manage Asset
      </a>
      <TokenSideBar
        handleToggleSideBar={handleToggleSideBar}
        isSideBarExpand={isSideBarExpand}
        adminAddress={adminAddress}
        holderAddress={holderAddress}
        beneficiaryAddress={beneficiaryAddress}
        approvedBeneficiaryAddress={approvedBeneficiaryAddress}
      />
    </>
  );
};

export default TokenSideBarContainer;
