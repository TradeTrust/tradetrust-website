import React from "react";
import PropTypes from "prop-types";
import { get } from "lodash";
import { TYPES, MESSAGES } from "../../../constants/VerificationErrorMessages";

const SuccessIcon = () => <i className="fas fa-check text-success" />;
const FailureIcon = () => <i className="fas fa-times text-danger" />;

const CheckStatusRow = ({ message, icon }) => (
  <div className="row no-gutters align-items-center">
    <div className="col-auto">{icon}</div>
    <div className="col">
      <div className="px-2">{message}</div>
    </div>
  </div>
);

const renderStatusCheckRow = (valid, messageSet) => (
  <CheckStatusRow
    message={valid ? messageSet.successTitle : messageSet.failureTitle}
    icon={valid ? SuccessIcon() : FailureIcon()}
  />
);

const renderStatuses = (verificationStatus) => {
  const hashValid = get(verificationStatus, "hash.checksumMatch", false);
  const issuedValid = get(verificationStatus, "issued.issuedOnAll", false);
  const revokedValid = !get(verificationStatus, "revoked.revokedOnAny", true);
  const identityValid = get(verificationStatus, "identity.identifiedOnAll", false);
  return (
    <div id="detailed-error">
      {renderStatusCheckRow(hashValid, MESSAGES[TYPES.HASH])}
      {renderStatusCheckRow(issuedValid, MESSAGES[TYPES.ISSUED])}
      {renderStatusCheckRow(revokedValid, MESSAGES[TYPES.REVOKED])}
      {renderStatusCheckRow(identityValid, MESSAGES[TYPES.IDENTITY])}
    </div>
  );
};

const CertificateVerifyCheck = (props) => {
  return <>{renderStatuses(props.verificationStatus)}</>;
};

CertificateVerifyCheck.propTypes = {
  verificationStatus: PropTypes.object,
};

CheckStatusRow.propTypes = {
  message: PropTypes.string,
  icon: PropTypes.element,
};

export default CertificateVerifyCheck;
