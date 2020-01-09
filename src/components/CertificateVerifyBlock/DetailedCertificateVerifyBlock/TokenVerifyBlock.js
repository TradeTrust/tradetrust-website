import React from "react";
import { getAssetInfo, makeEtherscanTokenURL } from "../../../utils";
import css from "./detailedCertificateBlock.scss";

const TokenVerifyBlock = ({ document, tokenOwner, tokenError }) => {
  const { tokenRegistry: registryAddress, tokenId } = getAssetInfo(document);
  if (tokenError) return <div className="text-danger">{tokenError}</div>;

  return (
    <>
      <div className={css["transferable-record"]}>The document is a transferable record.</div>
      <div>
        Owned by:{" "}
        <a
          href={makeEtherscanTokenURL({ registryAddress, tokenId })}
          id="token-owner-etherscan-link"
          rel="noreferrer noopener"
          target="_blank"
        >
          {tokenOwner}
        </a>
      </div>
    </>
  );
};

export default TokenVerifyBlock;
