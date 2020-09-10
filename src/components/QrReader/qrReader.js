import React from "react";
import PropTypes from "prop-types";
import QrReader from "react-qr-reader";
import { getLogger } from "../../utils/logger";

const { error } = getLogger("services:qr");

const QrReaderZone = ({ handleQrScanned }) => {
  const onScan = (data) => {
    if (data) handleQrScanned(data);
  };

  return <QrReader data-id="qr-code-reader" delay={100} onError={error} onScan={onScan} />;
};

export default QrReaderZone;

QrReaderZone.propTypes = {
  handleQrScanned: PropTypes.func.isRequired,
};
