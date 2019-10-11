import React, { useState } from "react";
import { get } from "lodash";
import DetailedCertificateVerifyBlock from "./DetailedCertificateVerifyBlock";
import css from "./certificateVerifyBlock.scss";
import icons from "../ViewerPageImages";

interface CertificateVerifyBlockProps {
  verificationStatus: any; // TODO type me
  detailedVerifyVisible?: boolean;
}

export const CertificateVerifyBlock: React.FunctionComponent<CertificateVerifyBlockProps> = ({
  verificationStatus,
  detailedVerifyVisible
}) => {
  const [detailedViewVisible, setDetailedViewVisible] = useState(false);
  const identityDetails: any[] = get(verificationStatus, "identity.details", []);
  const dnsNames = identityDetails.map(({ dns }) => (dns ? dns.toUpperCase() : null));

  return (
    <div
      id="certificate-verify-block"
      className={`align-items-start flex-nowrap ${css["d-flex"]} ${css.verifyBlocksContainer} mb-md-0 mb-3`}
    >
      <div
        className={`p-2 pointer ${css["simple-verify-block"]} ${css.valid} ${detailedVerifyVisible ? css.active : ""}`}
        onClick={() => setDetailedViewVisible(!detailedViewVisible)}
        id="certificate-status"
      >
        <div className="row" style={{ flexWrap: "inherit" }}>
          <div className={`d-flex justify-content-center align-items-center ${css["verified-icon"]}`}>
            {icons.checkCircle()}
          </div>
          <div className={css["verification-text"]}>{`Issued by ${dnsNames.length > 0 ? dnsNames[0] : "Unknown"}`}</div>
          <span className={`d-flex justify-content-center align-items-center ${css.arrow}`}>{icons.arrow()}</span>
        </div>
      </div>
      {detailedViewVisible ? <DetailedCertificateVerifyBlock verificationStatus={verificationStatus} /> : ""}
    </div>
  );
};
