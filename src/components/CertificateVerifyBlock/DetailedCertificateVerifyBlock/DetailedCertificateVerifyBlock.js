import React, { useState, useEffect } from "react";
import { get } from "lodash";
import CertificateVerifyCheck from "./CertificateVerifyCheck";
import css from "./detailedCertificateBlock.scss";
import TokenVerifyBlock from "./TokenVerifyBlock";
import { isERC721Token, getTokenOwner } from "../../../services/token";
import { getLogger } from "../../../utils/logger";

const { trace, error } = getLogger("Component:DetailedCertificateVerifyBlock");

const DetailedCertificateVerifyBlock = ({ verificationStatus, document }) => {
  const [tokenOwner, setTokenOwner] = useState("");
  const [tokenError, setError] = useState(null);

  const valid = get(verificationStatus, "valid", false);
  const borderColor = valid ? "valid-border-color" : "invalid-border-color";
  const isToken = isERC721Token(document);
  //optimize it using useCallback, handle owner change to clear the cache.
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

  return (
    <div className={`${css["detailed-certificate-block"]} ${css[borderColor]} bg-white p-3`}>
      <div className="mb-3">
        <h5>Details</h5>
      </div>
      {isToken && <TokenVerifyBlock document={document} tokenOwner={tokenOwner} tokenError={tokenError} />}
      <hr />
      <CertificateVerifyCheck verificationStatus={verificationStatus} />
    </div>
  );
};

export default DetailedCertificateVerifyBlock;
