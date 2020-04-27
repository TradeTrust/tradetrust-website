import React from "react";
import css from "./TokenSideBar.scss";
import TokenSideBarContent from "./TokenSideBarContent";
import TokenSideBarRole from "./TokenSideBarRole";
import { SvgIcon, SvgIconChervonLeft } from "./../UI/SvgIcon";

interface TokenSideBarContentProps {
  adminAddress: string;
  holderAddress: string;
  beneficiaryAddress: string;
  registryAddress: string;
  handler: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
}

const TokenSideBar = ({
  adminAddress,
  holderAddress,
  beneficiaryAddress,
  registryAddress,
  handler,
}: TokenSideBarContentProps) => {
  return (
    <aside className={`${css.tokensidebar} ${css["is-expanded"]}`}>
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
        <SvgIcon>
          <SvgIconChervonLeft />
        </SvgIcon>
      </div>
    </aside>
  );
};

export default TokenSideBar;
