import React from "react";
import PropTypes from "prop-types";
import css from "./viewerStyles.module.scss";

export const DefaultView = ({ hover, accept, toggleQrReaderVisible }) => (
  <div
    data-id="viewer-container"
    className={`${css["viewer-container"]} ${
      // eslint-disable-next-line no-nested-ternary
      hover ? (accept ? css.accept : css.invalid) : css.default
    }`}
  >
    <div className={css["image-container"]}>
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
        <button type="button" className={`pointer ${css.btn}`}>
          Select File
        </button>
        <button
          data-id="scan-qr-button"
          type="button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            toggleQrReaderVisible();
          }}
          className={`pointer ${css.btn}`}
        >
          Scan QR Code
        </button>
      </div>
    </div>
  </div>
);

DefaultView.propTypes = {
  hover: PropTypes.bool,
  accept: PropTypes.bool,
  toggleQrReaderVisible: PropTypes.func,
};
