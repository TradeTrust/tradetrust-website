import React from "react";
import { get } from "lodash";
import CertificateVerifyCheck from "./CertificateVerifyCheck";
import css from "./detailedCertificateBlock.scss";

const DetailedCertificateVerifyBlock = ({ verificationStatus }) => {
  const valid = get(verificationStatus, "valid", false);
  const borderColor = valid ? "valid-border-color" : "invalid-border-color";

  return (
    <div className={`${css["detailed-certificate-block"]} ${css[borderColor]} bg-white p-3`}>
      <h5>Details</h5>
      <hr />
      <CertificateVerifyCheck verificationStatus={verificationStatus} />
    </div>
  );
};

export default DetailedCertificateVerifyBlock;
