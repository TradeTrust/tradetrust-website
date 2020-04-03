import React from "react";
import css from "./TokenSideBar.scss";
import TokenSideBarContent from "./TokenSideBarContent";
import TokenSideBarRole from "./TokenSideBarRole";
import { SvgIcon } from "./../UI/SvgIcon";

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
  isSideBarExpand,
}: TokenSideBarContentProps) => {
  return (
    <aside className={`${css.tokensidebar} ${isSideBarExpand ? css["is-expanded"] : ""}`}>
      <div className={`${css["tokensidebar-content"]}`}>
        <header>
          <div className="row">
            <div className="col-12">
              <div className={`${css.heading}`}>
                <TokenSideBarRole />
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
        <SvgIcon cssClass="feather-chevron-left">
          <polyline points="15 18 9 12 15 6" />
        </SvgIcon>
      </div>
    </aside>
  );
};

export default TokenSideBar;
