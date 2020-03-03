import React from "react";
import css from "./TokenSideBar.scss";
import TokenSideBarContent from "./TokenSideBarContent";
import TokenSideBarRole from "./TokenSideBarRole";

interface TokenSideBarContentProps {
  adminAddress: string;
  holderAddress: string;
  beneficiaryAddress: string;
  registryAddress: string;
  handler: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
  isSideBarExpand: boolean;
}

const TokenSideBar = ({
  adminAddress,
  holderAddress,
  beneficiaryAddress,
  registryAddress,
  handler,
  isSideBarExpand
}: TokenSideBarContentProps) => {
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
          registryAddress={registryAddress}
          holderAddress={holderAddress}
          beneficiaryAddress={beneficiaryAddress}
        />
      </div>
      <div className={`${css.hamburger}`} onClick={handler}>
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
