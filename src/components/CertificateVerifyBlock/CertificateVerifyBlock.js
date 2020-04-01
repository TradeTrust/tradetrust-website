import React, { useState } from "react";
import PropTypes from "prop-types";
import DetailedCertificateVerifyBlock from "./DetailedCertificateVerifyBlock";
import css from "./certificateVerifyBlock.scss";
import icons from "../ViewerPageImages";

const renderIcon = () => (
  <div className={`d-flex justify-content-center align-items-center ${css["verified-icon"]}`}>
    {icons.checkCircle()}
  </div>
);

export const getIdentityVerificationText = (verificationStatus) => {
  const dnsFragmentName = "OpenAttestationDnsTxt";
  const dnsFragment = verificationStatus.find((status) => status.name === dnsFragmentName);
  // using concat to handle arrays and single element
  const dnsIdentity = dnsFragment?.data?.every((issuer) => issuer.status === "VALID");
  if (dnsIdentity) {
    return `Document issued by ${dnsFragment.data.map((issuer) => issuer.location.toUpperCase()).join(" and ")}`;
  }
  return "Document issued by Unknown";
};

const renderText = (identityDetails) => (
  <div className={css["verification-text"]}>{getIdentityVerificationText(identityDetails)}</div>
);

const SimpleVerifyBlock = (props) => {
  const { verificationStatus } = props;
  const renderedIcon = renderIcon();
  const renderedText = renderText(verificationStatus);

  return (
    <div
      className={`p-2 pointer ${css["simple-verify-block"]} ${css.valid} ${
        props.detailedVerifyVisible ? css.active : ""
      }`}
      onClick={props.toggleDetailedViewVisible}
      id="certificate-status"
    >
      <div className="row no-gutters" style={{ flexWrap: "inherit" }}>
        {renderedIcon}
        {renderedText}
        <span className={`d-flex justify-content-center align-items-center ${css.arrow}`}>{icons.arrow()}</span>
      </div>
    </div>
  );
};

const CertificateVerifyBlock = (props) => {
  const [detailedViewVisible, setDetailedViewVisible] = useState(false);
  const toggleDetailedViewVisible = () => setDetailedViewVisible(!detailedViewVisible);

  const { verificationStatus, document } = props;

  return (
    <div id="certificate-verify-block" className={`position-relative flex-nowrap align-items-start mb-md-0`}>
      <SimpleVerifyBlock
        verificationStatus={verificationStatus}
        toggleDetailedViewVisible={toggleDetailedViewVisible}
        detailedVerifyVisible={detailedViewVisible}
      />
      {detailedViewVisible ? (
        <DetailedCertificateVerifyBlock document={document} verificationStatus={verificationStatus} />
      ) : (
        ""
      )}
    </div>
  );
};

CertificateVerifyBlock.propTypes = {
  verifyTriggered: PropTypes.bool,
  verifying: PropTypes.bool,

  verificationStatus: PropTypes.array,
  toggleDetailedView: PropTypes.func,
  detailedVerifyVisible: PropTypes.bool,
};

SimpleVerifyBlock.propTypes = CertificateVerifyBlock.propTypes;

export default CertificateVerifyBlock;
