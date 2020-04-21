import React from "react";
import Dropzone from "react-dropzone";
import PropTypes from "prop-types";
import { DefaultView } from "./Views/DefaultView";
import { VerifyingView } from "./Views/VerifyingView";
import { UnverifiedView } from "./Views/UnverifiedView";
import css from "./CertificateDropzone.module.scss";
import { RetrievalErrorView } from "./Views/RetrievalErrorView";
import { isValid } from "../../services/verify/fragments";

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
}) => (
  <div className={css["padding-dropzone-boxshadow"]}>
    <Dropzone
      id="certificate-dropzone"
      onDrop={(acceptedFiles) => onFileDrop(acceptedFiles, handleCertificateChange, handleFileError)}
      className={css.dropzone}
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
      })}
    </Dropzone>
  </div>
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
};

export default CertificateDropzone;
