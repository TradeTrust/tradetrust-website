import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { ViewerContainer } from "./SharedViewerStyledComponents";

export const RetrievalErrorView = ({ resetData, retrieveCertificateByActionError }) => (
  <ViewerContainer id="viewer-container" className="invalid">
    <div className="flex justify-center my-4">
      <div className="w-auto mr-2">
        <img src="/static/images/dropzone/invalid.svg" alt="The Certificate is invalid" />
      </div>
      <div className="w-auto">
        <p className="invalid text-black text-2xl">This document is not valid</p>
      </div>
    </div>
    <div data-testid="error-tab" className="verifications">
      <div>
        <p className="messages">Unable to load certificate with the provided parameters</p>
        <p className="break-words">{retrieveCertificateByActionError}</p>
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
