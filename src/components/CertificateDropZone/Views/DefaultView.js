import PropTypes from "prop-types";
import React from "react";
import { ViewerButton, ViewerContainer } from "./SharedViewerStyledComponents";

export const DefaultView = ({ hover, accept, toggleQrReaderVisible }) => (
  <ViewerContainer data-id="viewer-container" className={`${hover ? (accept ? "accept" : "invalid") : "default"}`}>
    <div className="mb-4">
      <img
        className="mx-auto"
        style={{ width: "110px" }}
        alt="tradetrust Dropzone"
        src="/static/images/dropzone/dropzone_illustration.svg"
      />
    </div>
    {accept ? null : <div>File cannot be read. Please check that you have a valid .tt or .json file</div>}
    <div className="text-brand-navy" style={{ fontSize: "1.375rem", fontWeight: 500 }}>
      Drag and drop your tradetrust file
    </div>
    <div className="text-grey-700">to view its contents</div>
    <div className="text-grey-700 flex flex-wrap items-center my-2">
      <div className="w-2/12" />
      <div className="w-3/12">
        <hr className="border-grey-400" />
      </div>
      <div className="w-2/12">or</div>
      <div className="w-3/12">
        <hr className="border-grey-400" />
      </div>
    </div>
    <div className="text-grey-700 flex flex-wrap">
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
