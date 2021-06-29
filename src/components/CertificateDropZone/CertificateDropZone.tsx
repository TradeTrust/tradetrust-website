import React, { FunctionComponent, useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import { DefaultView } from "./Views/DefaultView";
import { RetrievalErrorView } from "./Views/RetrievalErrorView";
import { isValid, VerificationFragment } from "@govtechsg/oa-verify";
import { UnverifiedView } from "./Views/UnverifiedView";
import { VerifyingView } from "./Views/VerifyingView";

interface DropzoneStateProps {
  fileError?: boolean;
  verifying?: boolean;
  verificationStatus?: VerificationFragment[];
  verificationError?: string;
  retrieveCertificateByActionError?: string;
  resetData: () => void;
  handleRenderOverwrite?: () => void;
  toggleQrReaderVisible?: () => void;
}

interface DropzoneContentProps extends DropzoneStateProps {
  isDragAccept: boolean;
  isDragReject: boolean;
}

export const DropzoneContent: FunctionComponent<DropzoneContentProps> = ({
  verifying,
  fileError,
  verificationStatus,
  retrieveCertificateByActionError,
  verificationError,
  resetData,
  handleRenderOverwrite,
  toggleQrReaderVisible,
  isDragAccept,
  isDragReject,
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
  if (isDragAccept) {
    return <DefaultView hover={true} accept={true} toggleQrReaderVisible={toggleQrReaderVisible} />;
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

const onFileDrop = (
  acceptedFiles: Blob[],
  handleCertificateChange: (json: string) => void,
  handleFileError: (error: any) => void
) => {
  const reader = new FileReader();
  if (reader.error) {
    handleFileError(reader.error as any);
  }
  reader.onload = () => {
    try {
      const json = JSON.parse(reader.result as string);
      handleCertificateChange(json);
    } catch (e) {
      handleFileError(e);
    }
  };
  if (acceptedFiles && acceptedFiles.length && acceptedFiles.length > 0)
    acceptedFiles.map((f: Blob) => reader.readAsText(f));
};

interface CertificateDropzoneProps extends DropzoneStateProps {
  handleCertificateChange: (certificate: any) => void;
  handleFileError: () => void;
}

export const CertificateDropZone: FunctionComponent<CertificateDropzoneProps> = (props) => {
  const { handleCertificateChange, handleFileError } = props;
  return (
    <div id="certificate-dropzone" data-testid="certificate-dropzone" className="w-full h-auto px-4">
      <Dropzone onDrop={(acceptedFiles) => onFileDrop(acceptedFiles, handleCertificateChange, handleFileError)}>
        {({ getRootProps, getInputProps, isDragAccept, isDragReject }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <DropzoneContent {...props} isDragAccept={isDragAccept} isDragReject={isDragReject} />
          </div>
        )}
      </Dropzone>
    </div>
  );
};
