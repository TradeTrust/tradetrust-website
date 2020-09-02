import React from "react";
import PropTypes from "prop-types";
import { ViewerButton, ViewerContainer } from "./SharedViewerStyledComponents";

export const DefaultView = ({ hover, accept, toggleQrReaderVisible }) => (
  <ViewerContainer data-id="viewer-container" className={`${hover ? (accept ? "accept" : "invalid") : "default"}`}>
    <div className="image-container">
      <i>
        <img alt=".tradetrust Dropzone" src="/static/images/dropzone/dropzone_illustration.svg" />
      </i>
    </div>
    {accept ? null : <div>File cannot be read. Please check that you have a valid .tt or .json file</div>}
    <div className="text-brand-navy" style={{ fontSize: "1.375rem", fontWeight: 500 }}>
      Drag and drop your tradetrust file
    </div>
    <div className="text-muted">to view its contents</div>
    <div className="text-muted row">
      <div className="col-2" />
      <div className="col-3">
        <hr />
      </div>
      <div className="col-2">or</div>
      <div className="col-3">
        <hr />
      </div>
    </div>
    <div className="text-muted row">
      <div className="mx-auto">
        <ViewerButton>Select File</ViewerButton>
        <ViewerButton
          data-id="scan-qr-button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            toggleQrReaderVisible();
          }}
        >
          Scan QR Code
        </ViewerButton>
      </div>
    </div>
  </ViewerContainer>
);

DefaultView.propTypes = {
  hover: PropTypes.bool,
  accept: PropTypes.bool,
  toggleQrReaderVisible: PropTypes.func,
};
