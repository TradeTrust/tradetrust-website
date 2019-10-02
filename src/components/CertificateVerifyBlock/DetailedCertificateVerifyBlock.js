import PropTypes from "prop-types";
import { get } from "lodash";
import css from "./detailedCertificateBlock.scss";
import { TYPES, MESSAGES } from "../../constants/VerificationErrorMessages";

const SuccessIcon = () => <i className="fas fa-check text-success mr-2" />;
const FailureIcon = () => <i className="fas fa-times text-danger mr-2" />;

const CheckStatusRow = ({ message, icon }) => (
  <div className="row">
    <div className="col-2">{icon}</div>
    <div className="col-10">
      <div className="row">{message}</div>
    </div>
  </div>
);

const renderStatusCheckRow = (valid, messageSet) => (
  <CheckStatusRow
    message={valid ? messageSet.successTitle : messageSet.failureTitle}
    icon={valid ? SuccessIcon() : FailureIcon()}
  />
);

const renderStatuses = verificationStatus => {
  const hashValid = get(verificationStatus, "hash.checksumMatch", false);
  const issuedValid = get(verificationStatus, "issued.issuedOnAll", false);
  const revokedValid = !get(verificationStatus, "revoked.revokedOnAny", true);
  const identityValid = get(
    verificationStatus,
    "identity.identifiedOnAll",
    false
  );
  return (
    <div>
      {renderStatusCheckRow(hashValid, MESSAGES[TYPES.HASH])}
      {renderStatusCheckRow(issuedValid, MESSAGES[TYPES.ISSUED])}
      {renderStatusCheckRow(revokedValid, MESSAGES[TYPES.REVOKED])}
      {renderStatusCheckRow(identityValid, MESSAGES[TYPES.IDENTITY])}
    </div>
  );
};

const DetailedCertificateVerifyBlock = props => {
  const valid = get(props, "verificationStatus.valid", false);
  const borderColor = valid ? "valid-border-color" : "invalid-border-color";
  return (
    <div
      className={`${css["detailed-certificate-block"]} ${
        css[borderColor]
      } bg-white p-3`}
    >
      <div className="mb-3">
        <h5>Details</h5>
      </div>
      {renderStatuses(props.verificationStatus)}
    </div>
  );
};

DetailedCertificateVerifyBlock.propTypes = {
  verificationStatus: PropTypes.object
};

CheckStatusRow.propTypes = {
  message: PropTypes.string,
  icon: PropTypes.element
};

export default DetailedCertificateVerifyBlock;
