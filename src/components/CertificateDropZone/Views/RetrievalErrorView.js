import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import css from "./viewerStyles.module.scss";

export const RetrievalErrorView = ({ resetData, retrieveCertificateByActionError }) => (
  <div id="viewer-container" className={`${css["viewer-container"]} ${css.invalid}`}>
    <span className={css["message-container"]}>
      <img src="/static/images/dropzone/invalid.svg" alt="The Certificate is invalid" />
      <span className="invalid m-3" style={{ fontSize: "1.5rem" }}>
        This document is not valid
      </span>
    </span>
    <div id="error-tab" className={css.verifications}>
      <div>
        <p className={css.messages}>Unable to load certificate with the provided parameters</p>
        <p>{retrieveCertificateByActionError}</p>
      </div>
    </div>

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

RetrievalErrorView.propTypes = {
  resetData: PropTypes.func,
  document: PropTypes.object,
};
