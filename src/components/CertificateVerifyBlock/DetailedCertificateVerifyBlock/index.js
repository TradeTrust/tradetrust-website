import React from "react";
import { get } from "lodash";
import CertificateVerifyCheck from "./CertificateVerifyCheck";
import css from "./detailedCertificateBlock.scss";
import TokenVerifyBlock from "./TokenVerifyBlock";
import { isERC721Token } from "../../../services/erc721Token";

const DetailedCertificateVerifyBlock = ({ verificationStatus, document }) => {
  const valid = get(verificationStatus, "valid", false);
  const borderColor = valid ? "valid-border-color" : "invalid-border-color";
  const isToken = isERC721Token(document);
  return (
    <div className={`${css["detailed-certificate-block"]} ${css[borderColor]} bg-white p-3`}>
      <div className="mb-3">
        <h5>Details</h5>
      </div>
      {isToken && <TokenVerifyBlock document={document} />}
      <hr />
      <CertificateVerifyCheck verificationStatus={verificationStatus} />
    </div>
  );
};

export default DetailedCertificateVerifyBlock;
