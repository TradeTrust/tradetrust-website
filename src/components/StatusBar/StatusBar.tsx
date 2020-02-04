import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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

  const { holderAddress, beneficiaryAddress } = useSelector((state: any) => ({
    holderAddress: state.token.holderAddress,
    beneficiaryAddress: state.token.beneficiaryAddress
  }));

  const [tokenError, setError] = useState(null);
  const [tokenOwner, setTokenOwner] = useState("");
  const isToken = isERC721Token(document);
  useEffect(() => {
    async function fetchTokenOwner() {
      try {
        const owner = await getTokenOwner({ document });
        trace(`Token Owner: ${owner}`);
        setTokenOwner(owner);
      } catch (e) {
        error(`error in fetching token owner: ${JSON.stringify(e)}`);
        setError(e.message);
      }
    }
    if (isToken) fetchTokenOwner();
  }, [document, isToken]);

  if (!isToken) return null;

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
                        <h6>Token Address:</h6>
                        <a
                          href={makeEtherscanTokenURL({ registryAddress, tokenId })}
                          id="token-owner-etherscan-link"
                          rel="noreferrer noopener"
                          target="_blank"
                        >
                          {tokenOwner}
                        </a>
                      </div>
                      {holderAddress && (
                        <div className={css["statusbar-address"]}>
                          <h6>Holder Address:</h6>
                          <p className={css["statusbar-address-text"]}>{holderAddress}</p>
                        </div>
                      )}
                      {beneficiaryAddress && (
                        <div className={css["statusbar-address"]}>
                          <h6>Beneficiary Address:</h6>
                          <p className={css["statusbar-address-text"]}>{beneficiaryAddress}</p>
                        </div>
                      )}
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
