import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import { DefaultView } from "./Views/DefaultView";
import { RetrievalErrorView } from "./Views/RetrievalErrorView";
import { isValid } from "@govtechsg/oa-verify";
import { UnverifiedView } from "./Views/UnverifiedView";
import { VerifyingView } from "./Views/VerifyingView";

export const DropzoneContent = ({
  handleRenderOverwrite,
  resetData,
  isDragAccept,
  isDragReject,
  verifying,
  fileError,
  verificationStatus,
  toggleQrReaderVisible,
  retrieveCertificateByActionError,
  verificationError,
}) => {
  // isDragReject is checking for mimetype (but we skipped it)
  // fileError is when the file is not in JSON format and threw when deserilising
  // valid JSON files will be handled by handleCertificateChange()

  // change in prop does not update state, needs to update state
  const [verificationErrorMessage, setVerificationError] = useState(verificationError);
  useEffect(() => {
    setVerificationError(verificationError);
  }, [verificationError]);

  if (isDragReject || fileError) {
    return <DefaultView hover={true} accept={false} toggleQrReaderVisible={toggleQrReaderVisible} />;
  }
  if (verificationError) {
    return (
      <DefaultView
        hover={true}
        accept={true}
        toggleQrReaderVisible={toggleQrReaderVisible}
        verificationError={verificationErrorMessage}
      />
    );
  }
  if (isDragAccept) {
    return <DefaultView hover={true} accept={true} toggleQrReaderVisible={toggleQrReaderVisible} />;
  }
  if (verifying) {
    return <VerifyingView />;
  }
  if (!!retrieveCertificateByActionError) {
    return (
      <RetrievalErrorView resetData={resetData} retrieveCertificateByActionError={retrieveCertificateByActionError} />
    );
  }
  if (verificationStatus && !isValid(verificationStatus)) {
    return (
      <UnverifiedView
        handleRenderOverwrite={handleRenderOverwrite}
        verificationStatus={verificationStatus}
        resetData={resetData}
      />
    );
  }
  return <DefaultView hover={false} accept={true} toggleQrReaderVisible={toggleQrReaderVisible} />;
};

// Injects additional props on top of isDragReject, isDragActive, acceptedFiles & rejectedFiles
const renderDropzoneContentCurry = (additionalProps) => (props) => (
  <DropzoneContent {...{ ...props, ...additionalProps }} />
);

const onFileDrop = (acceptedFiles, handleCertificateChange, handleFileError) => {
  // eslint-disable-next-line no-undef
  const reader = new FileReader();
  if (reader.error) {
    handleFileError(reader.error);
  }
  reader.onload = () => {
    try {
      const json = JSON.parse(reader.result);
      handleCertificateChange(json);
    } catch (e) {
      handleFileError(e);
    }
  };
  if (acceptedFiles && acceptedFiles.length && acceptedFiles.length > 0) acceptedFiles.map((f) => reader.readAsText(f));
};

const CertificateDropzone = ({
  handleCertificateChange,
  resetData,
  handleFileError,
  handleRenderOverwrite,
  fileError,
  verifying,
  verificationStatus,
  toggleQrReaderVisible,
  retrieveCertificateByActionError,
  verificationError,
}) => (
  <Dropzone
    id="certificate-dropzone"
    onDrop={(acceptedFiles) => onFileDrop(acceptedFiles, handleCertificateChange, handleFileError)}
    className="w-full h-auto p-2"
  >
    {renderDropzoneContentCurry({
      handleCertificateChange,
      resetData,
      handleRenderOverwrite,
      fileError,
      verifying,
      verificationStatus,
      toggleQrReaderVisible,
      retrieveCertificateByActionError,
      verificationError,
    })}
  </Dropzone>
);

CertificateDropzone.propTypes = {
  resetData: PropTypes.func,
  handleCertificateChange: PropTypes.func,
  handleFileError: PropTypes.func,
  handleRenderOverwrite: PropTypes.func,
  updateCertificate: PropTypes.func,
  fileError: PropTypes.bool,
  verifying: PropTypes.bool,
  issuerIdentityStatus: PropTypes.object,
  toggleQrReaderVisible: PropTypes.func,
  verificationStatus: PropTypes.array,
  retrieveCertificateByActionError: PropTypes.string,
  verificationError: PropTypes.string,
};

DropzoneContent.propTypes = {
  handleRenderOverwrite: PropTypes.func,
  resetData: PropTypes.func,
  document: PropTypes.object,
  fileError: PropTypes.bool,
  verifying: PropTypes.bool,
  isDragAccept: PropTypes.bool,
  isDragReject: PropTypes.bool,
  issuerIdentityStatus: PropTypes.object,
  toggleQrReaderVisible: PropTypes.func,
  verificationStatus: PropTypes.array,
  retrieveCertificateByActionError: PropTypes.string,
  verificationError: PropTypes.string,
};

export default CertificateDropzone;
