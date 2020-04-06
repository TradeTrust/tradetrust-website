import React from "react";
import PropTypes from "prop-types";
import { TYPES, MESSAGES } from "../../../constants/VerificationErrorMessages";
import { isValid } from "../../../services/verify/fragments";
import { getAllButRevokeFragment, getRevokeFragment, certificateNotIssued } from "../../../services/verify/fragments";

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
  const positiveFragments = getAllButRevokeFragment(verificationStatus);
  const negativeFragments = [getRevokeFragment(verificationStatus)];
  const hashValid = isValid(positiveFragments, ["DOCUMENT_INTEGRITY"]);
  const issuedValid = isValid(positiveFragments, ["DOCUMENT_STATUS"]) && !certificateNotIssued(positiveFragments);
  const revokedValid = isValid(
    // TODO: Will need to amend this when we add revocation detection for tokens
    negativeFragments,
    ["DOCUMENT_STATUS"]
  );
  const identityValid = isValid(verificationStatus, ["ISSUER_IDENTITY"]);
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
  verificationStatus: PropTypes.array,
};

CheckStatusRow.propTypes = {
  message: PropTypes.string,
  icon: PropTypes.element,
};

export default CertificateVerifyCheck;
