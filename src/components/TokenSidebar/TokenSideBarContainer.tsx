import React, { FunctionComponent, useContext } from "react";
import { getData, WrappedDocument } from "@govtechsg/open-attestation";
import { SvgIcon } from "./../UI/SvgIcon";

import css from "./TokenSideBar.scss";

import TokenSideBarContent from "./TokenSideBarContent";
import TokenSideBarRole from "./TokenSideBarRole";
import { TokenStateProvider } from "../../common/contexts/tokenModuleContext";
import {
  TokenInstanceProviderWithSigner,
  TokenInstanceContextWithSigner,
} from "../../common/contexts/tokenInstancesContextWithSigner";

import { useUserWallet } from "../../common/hooks/useUserWallet";
const getAssetInfo = (document: WrappedDocument) => {
  const { tokenRegistry } = getData(document).issuers[0];
  const { merkleRoot: tokenId } = document.signature;
  return { tokenRegistry, tokenId };
};

export const TokenSideBarContainer: FunctionComponent<{
  document: WrappedDocument;
  isSidebarVisible: boolean;
  toggleSidebar: (val: boolean) => void;
}> = ({ document, isSidebarVisible, toggleSidebar }) => {
  const { tokenRegistry: registryAddress } = getAssetInfo(document);
  const { state: useWalletState, userWalletAddress, enableMetamask } = useUserWallet();
  const { titleEscrow } = useContext(TokenInstanceContextWithSigner);

  const handlerToggleSideBar = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (!userWalletAddress && useWalletState.error) {
      await enableMetamask();
    }
    toggleSidebar(!isSidebarVisible);
  };

  if (!registryAddress) return null;

  return (
    <TokenInstanceProviderWithSigner document={document}>
      <TokenStateProvider>
        <aside className={`${css.tokensidebar} ${isSidebarVisible ? css["is-expanded"] : ""}`}>
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
          <div className={`${css.hamburger}`} onClick={handlerToggleSideBar}>
            <SvgIcon cssClass="feather-chevron-left">
              <polyline points="15 18 9 12 15 6" />
            </SvgIcon>
          </div>
        </aside>
      </TokenStateProvider>
    </TokenInstanceProviderWithSigner>
  );
};
