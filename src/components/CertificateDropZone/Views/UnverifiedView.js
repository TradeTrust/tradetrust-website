import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  certificateNotIssued,
  getAllButRevokeFragment,
  getRevokeFragment,
  isValid,
} from "../../../services/verify/fragments";
import { TYPES, MESSAGES } from "../../../constants/VerificationErrorMessages";
import css from "./viewerStyles.scss";

const DetailedErrors = ({ verificationStatus }) => {
  const errors = [];
  const positiveFragments = getAllButRevokeFragment(verificationStatus);
  const negativeFragments = [getRevokeFragment(verificationStatus)];

  if (!isValid(positiveFragments, ["DOCUMENT_INTEGRITY"])) errors.push(TYPES.HASH);
  if (!isValid(positiveFragments, ["DOCUMENT_STATUS"]) && certificateNotIssued(positiveFragments))
    errors.push(TYPES.ISSUED);
  if (!isValid(negativeFragments, ["DOCUMENT_STATUS"])) errors.push(TYPES.REVOKED);
  if (!isValid(positiveFragments, ["ISSUER_IDENTITY"])) errors.push(TYPES.IDENTITY);

  return (
    <div id="error-tab" className={css.verifications}>
      {errors.map((errorType, index) => (
        <div key={index}>
          <p className={css.messages}>{MESSAGES[errorType].failureTitle}</p>
          <p>{MESSAGES[errorType].failureMessage}</p>
        </div>
      ))}
    </div>
  );
};

DetailedErrors.propTypes = {
  verificationStatus: PropTypes.array,
};

export const UnverifiedView = ({ resetData, verificationStatus }) => (
  <div id="viewer-container" className={`${css["viewer-container"]} ${css.invalid}`}>
    <span className={css["message-container"]}>
      <img src="/static/images/dropzone/invalid.svg" />
      <span className="invalid m-3" style={{ fontSize: "1.5rem" }}>
        This document is not valid
      </span>
    </span>
    <DetailedErrors verificationStatus={verificationStatus} />

    <div className={css["unverified-btn-container"]}>
      <Link to="/faq">
        <span className={css["unverified-btn"]}>What should I do?</span>
      </Link>
    </div>

    <div className={css["secondary-links"]}>
      <span
        onClick={(e) => {
          e.preventDefault();
          resetData();
        }}
        className={css["text-link"]}
      >
        Try another
      </span>
    </div>
  </div>
);

UnverifiedView.propTypes = {
  handleRenderOverwrite: PropTypes.func,
  resetData: PropTypes.func,
  document: PropTypes.object,
  verificationStatus: PropTypes.array,
};
