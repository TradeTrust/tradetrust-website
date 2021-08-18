import React from "react";
import { Button } from "@govtechsg/tradetrust-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { processQrCode, resetCertificateState, updateCertificate } from "../../reducers/certificate";
import QrReader, { QrDataType } from "../QrReader/qrReader";
import { CertificateDropZone } from "./CertificateDropZone";

// type as any for now
type CertificateData = any;
const DisableMessage = "Disable";

export const CertificateDropZoneContainer = (): React.ReactElement => {
  const [fileError, setFileError] = React.useState(false);
  const [qrReaderVisible, setQrReaderVisible] = React.useState(false);
  // TODO need to type certificate reducers
  const certificateState = useSelector((state: any) => state?.certificate);
  const { verificationPending, verificationStatus, verificationError, retrieveCertificateByActionError } =
    certificateState;
  const dispatch = useDispatch();

  const handleQrScanned = React.useCallback(
    (data: QrDataType) => {
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
    <>
      <QrReader handleQrScanned={handleQrScanned} />
      <div className="py-2 text-center">
        <Button className="bg-cerulean text-white hover:bg-cerulean-500" onClick={toggleQrReaderVisible}>
          {DisableMessage}
        </Button>
      </div>
    </>
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
