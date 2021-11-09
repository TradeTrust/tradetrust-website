import React, { FunctionComponent, useCallback, useMemo } from "react";
import { isValid } from "@govtechsg/oa-verify";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { updateCertificate, resetCertificateState, states } from "../../reducers/certificate";
import { getDropzoneBoxUi } from "./../../common/utils/getDropzoneBoxUi";
import { View, ViewVerificationError, ViewActionError, ViewVerificationPending } from "./../DocumentDropzone/Views";

interface CertificateDropzoneProps {
  toggleQrReaderVisible?: () => void;
}

export const CertificateDropZone: FunctionComponent<CertificateDropzoneProps> = (props) => {
  const { toggleQrReaderVisible } = props;
  const dispatch = useDispatch();
  const { verificationPending, verificationStatus, retrieveCertificateByActionState } = useSelector(
    (state: RootState) => state.certificate
  );

  const isVerificationPending = verificationPending;
  const isVerificationError = verificationStatus && !isValid(verificationStatus);
  const isActionError = retrieveCertificateByActionState === states.FAILURE;

  const resetData = useCallback(() => {
    dispatch(resetCertificateState());
  }, [dispatch]);

  const onDrop = useCallback(
    (acceptedFiles: Blob[]) => {
      acceptedFiles.forEach((file: Blob) => {
        const reader = new FileReader();

        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          try {
            const json = JSON.parse(reader.result as string);
            dispatch(updateCertificate(json));
          } catch (e) {
            console.error(e);
          }
        };
        reader.readAsText(file);
      });
    },
    [dispatch]
  );

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    multiple: false,
    // accept: "application/json", // TODO: https://react-dropzone.js.org/#!/Accepting%20specific%20file%20types
  });

  const customStyle = useMemo(() => {
    return getDropzoneBoxUi({
      isDragReject,
      isDragActive,
      isDragAccept,
      isVerificationPending,
      isVerificationError,
      isActionError,
    });
  }, [isDragReject, isDragActive, isDragAccept, isVerificationPending, isVerificationError, isActionError]);

  return (
    <div data-testid="certificate-dropzone" {...getRootProps()}>
      <input {...getInputProps()} />
      <div
        className={`border-2 border-dashed rounded-xl text-center relative p-8 min-h-400 flex flex-col justify-center ${customStyle}`}
      >
        {(() => {
          switch (true) {
            case isVerificationPending:
              return <ViewVerificationPending />;
            case isVerificationError:
              return <ViewVerificationError resetData={resetData} />;
            case isActionError:
              return <ViewActionError resetData={resetData} />;
            default:
              return <View toggleQrReaderVisible={toggleQrReaderVisible} />;
          }
        })()}
      </div>
    </div>
  );
};
