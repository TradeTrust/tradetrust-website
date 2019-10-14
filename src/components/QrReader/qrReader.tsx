import React, { FunctionComponent } from "react";
import QrReader from "react-qr-reader";
import { getLogger } from "../../utils/logger";

const { error } = getLogger("services:qr");
interface QrReaderZoneProps {
  handleQrScanned: (data: any) => void;
}
export const QrReaderZone: FunctionComponent<QrReaderZoneProps> = ({ handleQrScanned }) => {
  const onScan = (data: any) => {
    if (data) handleQrScanned(data);
  };

  return <QrReader data-id="qr-code-reader" delay={100} onError={error} onScan={onScan} style={{ width: "100%" }} />;
};
