import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { ViewerContainer } from "./SharedViewerStyledComponents";

export const RetrievalErrorView = ({ resetData, retrieveCertificateByActionError }) => (
  <ViewerContainer id="viewer-container" className="invalid">
    <span className="message-container">
      <img src="/static/images/dropzone/invalid.svg" alt="The Certificate is invalid" />
      <span className="invalid m-4" style={{ fontSize: "1.5rem" }}>
        This document is not valid
      </span>
    </span>
    <div id="error-tab" className="verifications">
      <div>
        <p className="messages">Unable to load certificate with the provided parameters</p>
        <p>{retrieveCertificateByActionError}</p>
      </div>
    </div>

    <div className="unverified-btn-container">
      <Link to="/faq">
        <span className="unverified-btn">What should I do?</span>
      </Link>
    </div>

    <div className="secondary-links">
      <span
        onClick={(e) => {
          e.preventDefault();
          resetData();
        }}
        className="text-link"
      >
        Try another
      </span>
    </div>
  </ViewerContainer>
);

RetrievalErrorView.propTypes = {
  resetData: PropTypes.func,
  document: PropTypes.object,
};
