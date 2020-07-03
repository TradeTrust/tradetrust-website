import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { interpretFragments } from "../../../services/verify/fragments";
import { TYPES, MESSAGES } from "../../../constants/VerificationErrorMessages";
import css from "./viewerStyles.module.scss";

const DetailedErrors = ({ verificationStatus }) => {
  const errors = [];

  const { hashValid, issuedValid, identityValid } = interpretFragments(verificationStatus);

  if (!hashValid) errors.push(TYPES.HASH);
  if (!issuedValid) errors.push(TYPES.ISSUED);
  if (!identityValid) errors.push(TYPES.IDENTITY);

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
      <img src="/static/images/dropzone/invalid.svg" alt="The Certificate is invalid" />
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
