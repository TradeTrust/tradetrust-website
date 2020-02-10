import React, { FunctionComponent, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SignedDocument } from "@govtechsg/open-attestation";
import { getTokenUserAddress, initializeToken } from "../../reducers/token";
import { loadAdminAddress } from "../../reducers/admin";
import { getAssetInfo } from "../../utils";

import css from "./TokenSideBar.scss";
import TokenSideBarContent from "./TokenSideBarContent";
import TokenSideBarRole from "./TokenSideBarRole";

export const TokenSideBar: FunctionComponent<{
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
    <aside className={`${css.tokensidebar} ${isSideBarExpand ? css["is-expanded"] : ""}`}>
      <div className={`${css["tokensidebar-content"]}`}>
        <header>
          <div className="row">
            <div className="col-12">
              <div className={`${css.heading}`}>
                <TokenSideBarRole
                  adminAddress={adminAddress}
                  holderAddress={holderAddress}
                  beneficiaryAddress={beneficiaryAddress}
                />
                <h2>Manage Asset</h2>
              </div>
              <div className={`${css.divider}`} />
            </div>
          </div>
        </header>
        <TokenSideBarContent
          adminAddress={adminAddress}
          holderAddress={holderAddress}
          beneficiaryAddress={beneficiaryAddress}
          approvedBeneficiaryAddress={approvedBeneficiaryAddress}
        />
      </div>
      <div className={`${css.hamburger}`} onClick={handleToggleSideBar}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-chevron-left"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </div>
    </aside>
  );
};

export default TokenSideBar;
