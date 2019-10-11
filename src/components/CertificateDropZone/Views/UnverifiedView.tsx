import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { get } from "lodash";
import { MESSAGES, TYPES } from "../../../constants/VerificationErrorMessages";
import css from "./viewerStyles.scss";

interface DetailedErrorsProps {
  verificationStatus: any; // TODO type me :)
}
const DetailedErrors: FunctionComponent<DetailedErrorsProps> = ({ verificationStatus }) => {
  const errors = [];
  if (!get(verificationStatus, "hash.checksumMatch")) errors.push(TYPES.HASH);
  if (!get(verificationStatus, "issued.issuedOnAll")) errors.push(TYPES.ISSUED);
  if (get(verificationStatus, "revoked.revokedOnAny", true)) errors.push(TYPES.REVOKED);
  if (!get(verificationStatus, "identity.identifiedOnAll")) errors.push(TYPES.IDENTITY);
  const renderedError = errors.map((errorType, index) => (
    <div key={index}>
      <p className={css.messages}>{MESSAGES[errorType].failureTitle}</p>
      <p>{MESSAGES[errorType].failureMessage}</p>
    </div>
  ));
  return (
    <div id="error-tab" className={css.verifications}>
      {renderedError}
    </div>
  );
};

interface UnverifiedViewProps {
  resetData: () => void;
  verificationStatus: any;
}
export const UnverifiedView: FunctionComponent<UnverifiedViewProps> = ({ resetData, verificationStatus }) => (
  <div
    className={`${css["viewer-container"]} ${css.invalid}`}
    style={{
      backgroundColor: "#fbeae9",
      borderRadius: 10
    }}
  >
    <span className={css["message-container"]}>
      <img src="/static/images/dropzone/invalid.svg" />
      <span className="invalid m-3" style={{ fontSize: "1.5rem" }}>
        This certificate is not valid
      </span>
    </span>

    <DetailedErrors verificationStatus={verificationStatus} />

    <div className={css["unverified-btn-container"]}>
      <Link to="/faq">
        <span className={css["unverified-btn"]}>What should I do?</span>
      </Link>
    </div>

    <div className={css["secondary-links"]}>
      <span>
        <a
          onClick={e => {
            e.preventDefault();
            resetData();
          }}
          className={css["text-link"]}
        >
          Try another
        </a>
      </span>
    </div>
  </div>
);
