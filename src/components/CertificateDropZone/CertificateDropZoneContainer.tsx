import styled from "@emotion/styled";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { processQrCode, resetCertificateState, updateCertificate } from "../../reducers/certificate";
import QrReader from "../QrReader/";
import { CertificateDropZone } from "./CertificateDropZone";
import { ViewerButton } from "./Views/SharedViewerStyledComponents";

const DisabledButton = styled(ViewerButton)`
  position: absolute;
  bottom: 0;
  left: 50%;
  z-index: 999;
  margin: 0;
  transform: translateX(-50%);
`;

// type as any for now
type QrData = any;
type CertificateData = any;
const DisableMessage = "Disabled";

export const CertificateDropZoneContainer = (): React.ReactElement => {
  const [fileError, setFileError] = React.useState(false);
  const [qrReaderVisible, setQrReaderVisible] = React.useState(false);
  // TODO need to type certificate reducers
  const certificateState = useSelector((state: any) => state?.certificate);
  const { verificationPending, verificationStatus, verificationError, retrieveCertificateByActionError } =
    certificateState;
  const dispatch = useDispatch();

  const handleQrScanned = React.useCallback(
    (data: QrData) => {
      dispatch(processQrCode(data));
      setQrReaderVisible(false);
    },
    [dispatch, setQrReaderVisible]
  );

  const handleCertificateChange = React.useCallback(
    (certificate: CertificateData) => {
      dispatch(updateCertificate(certificate));
      setFileError(false);
    },
    [dispatch]
  );

  const handleFileError = React.useCallback(() => {
    setFileError(true);
  }, [setFileError]);

  const toggleQrReaderVisible = React.useCallback(() => {
    setQrReaderVisible(!qrReaderVisible);
  }, [qrReaderVisible, setQrReaderVisible]);

  const resetData = React.useCallback(() => {
    dispatch(resetCertificateState());
  }, [dispatch]);

  return qrReaderVisible ? (
    <div className="relative">
      <QrReader handleQrScanned={handleQrScanned} />
      <DisabledButton onClick={toggleQrReaderVisible}>{DisableMessage}</DisabledButton>
    </div>
  ) : (
    <CertificateDropZone
      fileError={fileError}
      handleCertificateChange={handleCertificateChange}
      handleFileError={handleFileError}
      verifying={verificationPending}
      verificationStatus={verificationStatus}
      resetData={resetData}
      toggleQrReaderVisible={toggleQrReaderVisible}
      retrieveCertificateByActionError={retrieveCertificateByActionError}
      verificationError={verificationError}
    />
  );
};
