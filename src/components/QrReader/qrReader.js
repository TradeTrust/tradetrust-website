import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useScanner } from "./Scanner";

const QrReaderZone = ({ handleQrScanned }) => {
  const scannerRef = useRef(null);
  const onScan = (data) => {
    if (data) handleQrScanned(data);
  };
  useScanner({
    scannerRef,
    onDetected: (result) => onScan(result),
  });

  const containerStyle = {
    overflow: "hidden",
    position: "relative",
    width: "100%",
    paddingTop: "100%",
  };
  const previewStyle = {
    top: 0,
    left: 0,
    display: "block",
    position: "absolute",
    overflow: "hidden",
    width: "100%",
    height: "100%",
  };
  const videoPreviewStyle = {
    ...previewStyle,
    objectFit: "cover",
    transform: "scaleX(-1)",
  };

  return (
    <div style={containerStyle}>
      <video data-id="qr-code-reader" ref={scannerRef} style={videoPreviewStyle} />
    </div>
  );
};

export default QrReaderZone;

QrReaderZone.propTypes = {
  handleQrScanned: PropTypes.func.isRequired,
};
