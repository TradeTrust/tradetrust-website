import React, { useContext } from "react";
import css from "./TokenSideBar.scss";
import TokenSideBarContent from "./TokenSideBarContent";
import TokenSideBarRole from "./TokenSideBarRole";
import { SvgIcon } from "./../UI/SvgIcon";
import { TokenInstanceContextWithSigner } from "../../common/contexts/tokenInstancesContextWithSigner";
import { TokenStateProvider } from "../../common/contexts/tokenModuleContext";

interface TokenSideBarContentProps {
  userWalletAddress: string;
  registryAddress: string;
  handler: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
  isSideBarExpand: boolean;
}

const TokenSideBar = ({ userWalletAddress, registryAddress, handler, isSideBarExpand }: TokenSideBarContentProps) => {
  const { titleEscrow } = useContext(TokenInstanceContextWithSigner);
  return (
    <TokenStateProvider>
      <aside className={`${css.tokensidebar} ${isSideBarExpand ? css["is-expanded"] : ""}`}>
        <div className={`${css["tokensidebar-content"]}`}>
          <header>
            <div className="row">
              <div className="col-12">
                <div className={`${css.heading}`}>
                  {titleEscrow && <TokenSideBarRole titleEscrowInstance={titleEscrow} />}
                  <h2>Manage Asset</h2>
                </div>
                <div className={`${css.divider}`} />
              </div>
            </div>
          </header>
          {titleEscrow && (
            <TokenSideBarContent
              userWalletAddress={userWalletAddress}
              registryAddress={registryAddress}
              titleEscrow={titleEscrow}
            />
          )}
        </div>
        <div className={`${css.hamburger}`} onClick={handler}>
          <SvgIcon cssClass="feather-chevron-left">
            <polyline points="15 18 9 12 15 6" />
          </SvgIcon>
        </div>
      </aside>
    </TokenStateProvider>
  );
};

export default TokenSideBar;
