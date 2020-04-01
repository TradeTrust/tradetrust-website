import React from "react";
import { isValid } from "../../../services/verify/fragments";
import CertificateVerifyCheck from "./CertificateVerifyCheck";
import css from "./detailedCertificateBlock.scss";

const DetailedCertificateVerifyBlock = ({ verificationStatus }) => {
  const borderColor = isValid(verificationStatus) ? "valid-border-color" : "invalid-border-color";

  return (
    <div className={`${css["detailed-certificate-block"]} ${css[borderColor]} bg-white p-3`}>
      <h5>Details</h5>
      <hr />
      <CertificateVerifyCheck verificationStatus={verificationStatus} />
    </div>
  );
};

export default DetailedCertificateVerifyBlock;
