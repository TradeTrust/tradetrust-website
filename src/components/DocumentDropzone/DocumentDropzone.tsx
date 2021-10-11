import React, { FunctionComponent, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { isValid, VerificationFragment } from "@govtechsg/oa-verify";
import { Button, ButtonSize, LoaderSpinner } from "@govtechsg/tradetrust-ui-components";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { MESSAGES, TYPES } from "../../constants/VerificationErrorMessages";
import { interpretFragments } from "../../services/verify/fragments";
import { updateDemoDocument, resetDemoState } from "../../reducers/demo-verify";
import { updateCertificate, resetCertificateState } from "../../reducers/certificate";

enum DropzoneState {
  DRAG_REJECT = "border-red-400 bg-red-100",
  DRAG_ACTIVE = "border-green-400 bg-green-50",
  DRAG_ACCEPT = "border-green-400 bg-green-50",
  PENDING = "border-cloud-100 bg-white",
  ERROR = "border-red-400 bg-red-100",
  DEFAULT = "border-cloud-100 bg-white",
}

interface GetDropzoneBoxUi {
  isDragReject: boolean;
  isDragActive: boolean;
  isDragAccept: boolean;
  isPending: boolean;
  isError: boolean | null;
}

const getDropzoneBoxUi = ({ isDragReject, isDragActive, isDragAccept, isPending, isError }: GetDropzoneBoxUi) => {
  switch (true) {
    case isDragReject:
      return DropzoneState.DRAG_REJECT;
    case isDragActive:
      return DropzoneState.DRAG_ACTIVE;
    case isDragAccept:
      return DropzoneState.DRAG_ACCEPT;
    case isPending:
      return DropzoneState.PENDING;
    case isError:
      return DropzoneState.ERROR;
    default:
      return DropzoneState.DEFAULT;
  }
};

interface DetailedErrorsProps {
  verificationStatus: VerificationFragment[];
}

const DetailedErrors: FunctionComponent<DetailedErrorsProps> = ({ verificationStatus }) => {
  if (!verificationStatus) return null;

  const errors = [];
  const { hashValid, issuedValid, identityValid } = interpretFragments(verificationStatus);

  if (!hashValid) errors.push(TYPES.HASH);
  if (!issuedValid) errors.push(TYPES.ISSUED);
  if (!identityValid) errors.push(TYPES.IDENTITY);

  return (
    <div data-testid="error-tab" className="mb-8">
      {errors.map((errorType, index) => (
        <div key={index} className="my-2">
          <h4 className="text-red-500 mb-0">{MESSAGES[errorType].failureTitle}</h4>
          <p className="break-words">{MESSAGES[errorType].failureMessage}</p>
        </div>
      ))}
    </div>
  );
};

interface DocumentDropzoneViewProps {
  isDemo: boolean;
  isPending: boolean;
  isError: boolean | null;
  verificationStatus: VerificationFragment[];
  resetDocument: () => void;
}

const DocumentDropzoneView: FunctionComponent<DocumentDropzoneViewProps> = ({
  isDemo,
  isPending,
  isError,
  verificationStatus,
  resetDocument,
}) => {
  switch (true) {
    case isPending:
      return (
        <div>
          <LoaderSpinner data-testid={"veriyfing-spinner"} className="mx-auto" width="50px" primary="#0099cc" />
          <p className="m-4 text-2xl">Verifying Document...</p>
        </div>
      );
    case isError:
      return (
        <div>
          <div className="flex justify-center items-center my-4">
            <div className="w-auto mr-2">
              <img src="/static/images/dropzone/invalid.svg" alt="Document invalid" />
            </div>
            <div className="w-auto">
              <p className="text-2xl">This document is not valid</p>
            </div>
          </div>
          <DetailedErrors verificationStatus={verificationStatus} />
          <Link
            to="/faq"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Button className={`text-white bg-red-500 border-red-500 hover:bg-red-300 hover:border-red-300`}>
              What Should I do?
            </Button>
          </Link>
          <br />
          <div
            data-testid="try-another"
            className="my-8 transition-colors duration-200 underline cursor-pointer text-red-500 hover:text-gray-500"
            onClick={(e) => {
              e.preventDefault();
              resetDocument();
            }}
          >
            Try another document
          </div>
        </div>
      );
    default:
      return (
        <div>
          {isDemo && (
            <h2 className="absolute top-0 left-0 right-0 mt-8 mx-auto text-gray-600 text-opacity-10 text-7xl lg:text-9xl">
              DEMO
            </h2>
          )}
          <img
            className="mx-auto w-56"
            alt="Dropzone TradeTrust"
            src="/static/images/dropzone/dropzone_illustration.svg"
          />
          <h4>Drop your TradeTrust demo document to view its content</h4>
          <p className="my-6">Or</p>
          <Button className="bg-cerulean text-white hover:bg-cerulean-500" size={ButtonSize.SM}>
            Select Document
          </Button>
        </div>
      );
  }
};

interface DocumentDropzoneProps {
  isDemo: boolean;
}

export const DocumentDropzone: FunctionComponent<DocumentDropzoneProps> = ({ isDemo }) => {
  const dispatch = useDispatch();
  const isPending = useSelector((state: RootState) => {
    if (isDemo) {
      return state.demoVerify.verificationPending;
    } else {
      return state.certificate.verificationPending;
    }
  });
  const verificationStatus = useSelector((state: RootState) => {
    if (isDemo) {
      return state.demoVerify.verificationStatus;
    } else {
      return state.certificate.verificationStatus;
    }
  });
  const isError = verificationStatus && !isValid(verificationStatus);

  const updateDocument = useCallback(
    (json) => {
      if (isDemo) {
        dispatch(updateDemoDocument(json));
      } else {
        dispatch(updateCertificate(json));
      }
    },
    [dispatch, isDemo]
  );

  const resetDocument = useCallback(() => {
    if (isDemo) {
      dispatch(resetDemoState());
    } else {
      dispatch(resetCertificateState());
    }
  }, [dispatch, isDemo]);

  const onDrop = useCallback(
    (acceptedFiles: Blob[]) => {
      acceptedFiles.forEach((file: Blob) => {
        const reader = new FileReader();

        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          try {
            const json = JSON.parse(reader.result as string);
            updateDocument(json); // pushes to viewer page
          } catch (e) {
            console.log(e);
          }
        };
        reader.readAsText(file);
      });
    },
    [updateDocument]
  );

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    multiple: false,
    // accept: "application/json", // TODO: https://react-dropzone.js.org/#!/Accepting%20specific%20file%20types
  });
  const dropzoneBoxUi = getDropzoneBoxUi({
    isPending,
    isDragActive,
    isDragAccept,
    isDragReject,
    isError,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div
        className={`border-2 border-dashed rounded-xl text-center relative p-8 min-h-400 flex flex-col justify-center ${dropzoneBoxUi}`}
      >
        <DocumentDropzoneView
          isDemo={isDemo}
          isPending={isPending}
          isError={isError}
          verificationStatus={verificationStatus}
          resetDocument={resetDocument}
        />
      </div>
    </div>
  );
};
