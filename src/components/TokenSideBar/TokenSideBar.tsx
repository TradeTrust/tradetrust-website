import React, { FunctionComponent } from "react";

import css from "./TokenSideBar.scss";
import TokenSideBarContent from "./TokenSideBarContent";
import TokenSideBarRole from "./TokenSideBarRole";

export const TokenSideBar: FunctionComponent<{
  handleToggleSideBar: any;
  isSideBarExpand: boolean;
  adminAddress: string;
  holderAddress: string;
  beneficiaryAddress: string;
  approvedBeneficiaryAddress: string;
}> = ({
  handleToggleSideBar,
  isSideBarExpand,
  adminAddress,
  holderAddress,
  beneficiaryAddress,
  approvedBeneficiaryAddress
}) => {
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
