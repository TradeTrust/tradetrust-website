import React, { FunctionComponent } from "react";
import { get } from "lodash";
import css from "./detailedCertificateBlock.scss";
import { MESSAGES, TYPES } from "../../constants/VerificationErrorMessages";

const SuccessIcon = () => <i className="fas fa-check text-success mr-2" />;
const FailureIcon = () => <i className="fas fa-times text-danger mr-2" />;

interface CheckStatusRowProps {
  message: string;
  icon: React.ReactElement;
}
const CheckStatusRow: FunctionComponent<CheckStatusRowProps> = ({ message, icon }) => (
  <div className="row">
    <div className="col-2">{icon}</div>
    <div className="col-10">
      <div className="row">{message}</div>
    </div>
  </div>
);

const renderStatusCheckRow = (
  valid: boolean,
  messageSet: { failureTitle: any; successTitle: any; failureMessage?: string }
) => (
  <CheckStatusRow
    message={valid ? messageSet.successTitle : messageSet.failureTitle}
    icon={valid ? SuccessIcon() : FailureIcon()}
  />
);

interface DetailedCertificateVerifyBlockProps {
  verificationStatus: any; // TODO type me
}
export const DetailedCertificateVerifyBlock: FunctionComponent<DetailedCertificateVerifyBlockProps> = props => {
  const valid = get(props, "verificationStatus.valid", false);
  const borderColor = valid ? "valid-border-color" : "invalid-border-color";
  const hashValid = get(props.verificationStatus, "hash.checksumMatch", false);
  const issuedValid = get(props.verificationStatus, "issued.issuedOnAll", false);
  const revokedValid = !get(props.verificationStatus, "revoked.revokedOnAny", true);
  const identityValid = get(props.verificationStatus, "identity.identifiedOnAll", false);
  return (
    <div className={`${css["detailed-certificate-block"]} ${css[borderColor]} bg-white p-3`}>
      <div className="mb-3">
        <h5>Details</h5>
      </div>
      <div id="detailed-error">
        {renderStatusCheckRow(hashValid, MESSAGES[TYPES.HASH])}
        {renderStatusCheckRow(issuedValid, MESSAGES[TYPES.ISSUED])}
        {renderStatusCheckRow(revokedValid, MESSAGES[TYPES.REVOKED])}
        {renderStatusCheckRow(identityValid, MESSAGES[TYPES.IDENTITY])}
      </div>
    </div>
  );
};
