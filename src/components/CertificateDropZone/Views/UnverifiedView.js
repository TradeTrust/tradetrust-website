import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { get } from "lodash";
import { TYPES, MESSAGES } from "../../../constants/VerificationErrorMessages";
import css from "./viewerStyles.scss";

const DetailedErrors = ({ verificationStatus, retrieveCertificateByActionError }) => {
  const errors = [];
  if (!get(verificationStatus, "hash.checksumMatch")) errors.push(TYPES.HASH);
  if (!get(verificationStatus, "issued.issuedOnAll") && !get(verificationStatus, "revoked.revokedOnAny"))
    errors.push(TYPES.ISSUED); // if it is revoked on any then it should only show revoked
  if (get(verificationStatus, "revoked.revokedOnAny", true)) errors.push(TYPES.REVOKED);
  if (!get(verificationStatus, "identity.identifiedOnAll")) errors.push(TYPES.IDENTITY);
  return (
    <div id="error-tab" className={css.verifications}>
      {retrieveCertificateByActionError ? (
        <div>
          <p className={css.messages}>Unable to load certificate with the provided parameters</p>
          <p>{retrieveCertificateByActionError}</p>
        </div>
      ) : (
        errors.map((errorType, index) => (
          <div key={index}>
            <p className={css.messages}>{MESSAGES[errorType].failureTitle}</p>
            <p>{MESSAGES[errorType].failureMessage}</p>
          </div>
        ))
      )}
    </div>
  );
};

DetailedErrors.propTypes = {
  verificationStatus: PropTypes.object,
  retrieveCertificateByActionError: PropTypes.string,
};

const View = ({ resetData, verificationStatus, retrieveCertificateByActionError }) => (
  <div id="viewer-container" className={`${css["viewer-container"]} ${css.invalid}`}>
    <span className={css["message-container"]}>
      <img src="/static/images/dropzone/invalid.svg" />
      <span className="invalid m-3" style={{ fontSize: "1.5rem" }}>
        This document is not valid
      </span>
    </span>
    <DetailedErrors
      verificationStatus={verificationStatus}
      retrieveCertificateByActionError={retrieveCertificateByActionError}
    />

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

View.propTypes = {
  handleRenderOverwrite: PropTypes.func,
  resetData: PropTypes.func,
  document: PropTypes.object,
  verificationStatus: PropTypes.object,
};

export default View;
