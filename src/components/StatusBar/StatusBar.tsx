import React, { useState, useEffect } from "react";
import css from "./StatusBar.scss";
import { getAssetInfo, makeEtherscanTokenURL } from "./../../utils";
import { isERC721Token, getTokenOwner } from "./../../services/token";
import { getLogger } from "./../../utils/logger";
const { trace, error } = getLogger("Component:DetailedCertificateVerifyBlock");

interface StatusBarProps {
  document: object;
}

const StatusBar = ({ document }: StatusBarProps) => {
  const { tokenRegistry: registryAddress, tokenId } = getAssetInfo(document);

  const [tokenError, setError] = useState(null);
  const [tokenOwner, setTokenOwner] = useState("");
  const isToken = isERC721Token(document);
  useEffect(() => {
    async function fetchTokenOwner() {
      // console.log("fetching");
      try {
        const owner = await getTokenOwner({ document });
        // throw new Error("Cannot find token owner");
        trace(`Token Owner: ${owner}`);
        setTokenOwner(owner);
      } catch (e) {
        error(`error in fetching token owner: ${JSON.stringify(e)}`);
        // console.log("error !!!", e.message);
        setError(e.message);
      }
    }
    if (isToken) fetchTokenOwner();
  }, [document, isToken]);

  return (
    <>
      {isToken && (
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
      )}
    </>
  );
};

export default StatusBar;
