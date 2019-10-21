import React, { useState } from "react";
import PropTypes from "prop-types";
import { get } from "lodash";
import DetailedCertificateVerifyBlock from "./DetailedCertificateVerifyBlock";
import css from "./certificateVerifyBlock.scss";
import icons from "../ViewerPageImages";

const renderIcon = () => (
  <div className={`d-flex justify-content-center align-items-center ${css["verified-icon"]}`}>
    {icons.checkCircle()}
  </div>
);

export const getIdentityVerificationText = identityDetails => {
  const dnsNames = identityDetails.map(({ dns }) => (dns ? dns.toUpperCase() : null));
  return `Issued by ${dnsNames.length > 0 ? dnsNames[0] : "Unknown"}`;
};

const renderText = identityDetails => (
  <div className={css["verification-text"]}>{getIdentityVerificationText(identityDetails)}</div>
);

const SimpleVerifyBlock = props => {
  const { verificationStatus } = props;
  const renderedIcon = renderIcon();
  const renderedText = renderText(get(verificationStatus, "identity.details", []));

  return (
    <div
      className={`p-2 pointer ${css["simple-verify-block"]} ${css.valid} ${
        props.detailedVerifyVisible ? css.active : ""
      }`}
      onClick={props.toggleDetailedViewVisible}
      id="certificate-status"
    >
      <div className="row" style={{ flexWrap: "inherit" }}>
        {renderedIcon}
        {renderedText}
        <span className={`d-flex justify-content-center align-items-center ${css.arrow}`}>{icons.arrow()}</span>
      </div>
    </div>
  );
};

const CertificateVerifyBlock = props => {
  const [detailedViewVisible, setDetailedViewVisible] = useState(false);
  const toggleDetailedViewVisible = () => setDetailedViewVisible(!detailedViewVisible);

  const { verificationStatus } = props;

  return (
    <div
      id="certificate-verify-block"
      className={`align-items-start flex-nowrap ${css["d-flex"]} ${css.verifyBlocksContainer} mb-md-0`}
    >
      <SimpleVerifyBlock
        verificationStatus={verificationStatus}
        toggleDetailedViewVisible={toggleDetailedViewVisible}
      />
      {detailedViewVisible ? <DetailedCertificateVerifyBlock verificationStatus={verificationStatus} /> : ""}
    </div>
  );
};

CertificateVerifyBlock.propTypes = {
  verifyTriggered: PropTypes.bool,
  verifying: PropTypes.bool,

  verificationStatus: PropTypes.object,
  toggleDetailedView: PropTypes.func,
  detailedVerifyVisible: PropTypes.bool
};

SimpleVerifyBlock.propTypes = CertificateVerifyBlock.propTypes;

export default CertificateVerifyBlock;
