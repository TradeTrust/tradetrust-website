import React from "react";
import css from "./StatusBar.scss";
import { getAssetInfo, makeEtherscanTokenURL } from "./../../utils";

interface StatusBarProps {
  document: object;
  tokenOwner: string;
  tokenError: any;
}

const StatusBar = ({ document, tokenOwner, tokenError }: StatusBarProps) => {
  const { tokenRegistry: registryAddress, tokenId } = getAssetInfo(document);

  return (
    <>
      <div className={css.statusbar}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-auto ml-auto mr-auto">
              {tokenError ? (
                <h3 className={css["statusbar-title"]}>{tokenError}</h3>
              ) : (
                <div className={`dropdown ${css["statusbar-dropdown"]}`}>
                  <div
                    className={`dropdown-toggle ${css["statusbar-dropdown-toggle"]}`}
                    id="dropdownMenuAddresses"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <h3 className={css["statusbar-title"]}>
                      The document is a <b>transferable</b> record.
                    </h3>
                  </div>
                  <div
                    className={`dropdown-menu ${css["statusbar-dropdown-menu"]}`}
                    aria-labelledby="dropdownMenuAddresses"
                  >
                    <div className={css["statusbar-address"]}>
                      <h6>Holder Address:</h6>
                      <a
                        href={makeEtherscanTokenURL({ registryAddress, tokenId })}
                        id="token-owner-etherscan-link"
                        rel="noreferrer noopener"
                        target="_blank"
                      >
                        {tokenOwner}
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatusBar;
