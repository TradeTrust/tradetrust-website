import React, { FunctionComponent } from "react";
import Dropzone from "react-dropzone";
import { DefaultView } from "./Views/DefaultView";
import { VerifyingView } from "./Views/VerifyingView";
import { UnverifiedView } from "./Views/UnverifiedView";
import css from "./CertificateDropzone.css";

interface DropzoneContentProps {
  resetData: () => void;
  fileError?: boolean;
  verifying?: boolean;
  isDragAccept?: boolean;
  isDragReject?: boolean;
  toggleQrReaderVisible: () => void;
  verificationStatus: any;
}
export const DropzoneContent: FunctionComponent<DropzoneContentProps> = ({
  resetData,
  isDragAccept,
  isDragReject,
  verifying,
  fileError,
  verificationStatus,
  toggleQrReaderVisible
}) => {
  // isDragReject is checking for mimetype (but we skipped it)
  // fileError is when the file is not in JSON format and threw when deserilising
  // valid JSON files will be handled by handleCertificateChange()
  if (isDragReject || fileError) {
    return <DefaultView hover={true} accept={false} toggleQrReaderVisible={toggleQrReaderVisible} />;
  }
  if (isDragAccept) {
    return <DefaultView hover={true} accept={true} toggleQrReaderVisible={toggleQrReaderVisible} />;
  }
  if (verifying) {
    return <VerifyingView />;
  }
  if (verificationStatus && !verificationStatus.valid) {
    return <UnverifiedView verificationStatus={verificationStatus} resetData={resetData} />;
  }
  return <DefaultView hover={false} accept={true} toggleQrReaderVisible={toggleQrReaderVisible} />;
};

const onFileDrop = (
  acceptedFiles: File[],
  handleCertificateChange: (json: any) => void,
  handleFileError: (error: Error) => void
) => {
  // eslint-disable-next-line no-undef
  const reader = new FileReader();
  if (reader.error) {
    handleFileError(reader.error);
  }
  reader.onload = () => {
    if (typeof reader.result === "string") {
      try {
        const json = JSON.parse(reader.result || "");
        handleCertificateChange(json);
      } catch (e) {
        handleFileError(e);
      }
    } else {
      handleFileError(new Error("Unable to handle this file with type " + typeof reader.result));
    }
  };
  if (acceptedFiles && acceptedFiles.length && acceptedFiles.length > 0) acceptedFiles.map(f => reader.readAsText(f));
};

interface CertificateDropZoneProps {
  resetData: () => void;
  handleFileError: (error: Error) => void;
  fileError?: boolean;
  verifying?: boolean;
  handleCertificateChange: (json: any) => void; // TODO type me :)
  toggleQrReaderVisible: () => void;
  verificationStatus: any;
}
const CertificateDropzone: FunctionComponent<CertificateDropZoneProps> = ({
  handleCertificateChange,
  resetData,
  handleFileError,
  fileError,
  verifying,
  verificationStatus,
  toggleQrReaderVisible
}) => (
  <Dropzone
    id="certificate-dropzone"
    onDrop={acceptedFiles => onFileDrop(acceptedFiles, handleCertificateChange, handleFileError)}
    className={css.dropzone}
  >
    {props => (
      <DropzoneContent
        fileError={fileError}
        resetData={resetData}
        toggleQrReaderVisible={toggleQrReaderVisible}
        verificationStatus={verificationStatus}
        verifying={verifying}
        {...props}
      />
    )}
  </Dropzone>
);

export default CertificateDropzone;
