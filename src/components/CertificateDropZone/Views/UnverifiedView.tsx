import { VerificationFragment } from "@govtechsg/oa-verify";
import React from "react";
import { Link } from "react-router-dom";
import { MESSAGES, TYPES } from "../../../constants/VerificationErrorMessages";
import { interpretFragments } from "../../../services/verify/fragments";
import { docNotValidMessage, tryAnotherMessage, unverifiedMessage } from "./";
import { WrappedOrSignedOpenAttestationDocument } from "../../../utils/shared";
import { sharedViewer, sharedViewerInvalid, sharedViewerInvalidButton } from "./DefaultView";

const DetailedErrors = ({ verificationStatus }: { verificationStatus: VerificationFragment[] }) => {
  const errors = [];

  const { hashValid, issuedValid, identityValid } = interpretFragments(verificationStatus);

  if (!hashValid) errors.push(TYPES.HASH);
  if (!issuedValid) errors.push(TYPES.ISSUED);
  if (!identityValid) errors.push(TYPES.IDENTITY);

  return (
    <div data-testid="error-tab" className="mb-8">
      {errors.map((errorType, index) => (
        <div key={index} className="my-2">
          <h4 className="mb-0">{MESSAGES[errorType].failureTitle}</h4>
          <p className="break-words text-black">{MESSAGES[errorType].failureMessage}</p>
        </div>
      ))}
    </div>
  );
};

const ActionError = ({ retrieveCertificateByActionError }: { retrieveCertificateByActionError: string }) => {
  return (
    <div data-testid="error-tab" className="mb-8">
      <div>
        <h4 className="mb-0">Unable to load certificate with the provided parameters</h4>
        <p className="break-words text-black">{retrieveCertificateByActionError}</p>
      </div>
    </div>
  );
};

interface UnverifiedViewProps {
  resetData: () => void;
  document?: WrappedOrSignedOpenAttestationDocument;
  verificationStatus?: VerificationFragment[];
  retrieveCertificateByActionError?: string;
}

export const UnverifiedView = ({
  resetData,
  verificationStatus,
  retrieveCertificateByActionError,
}: UnverifiedViewProps): React.ReactElement => (
  <div className={`${sharedViewer} ${sharedViewerInvalid}`}>
    <div className="flex justify-center items-center my-4">
      <div className="w-auto mr-2">
        <img src="/static/images/dropzone/invalid.svg" alt="The Certificate is invalid" />
      </div>
      <div className="w-auto">
        <p className="invalid text-black text-2xl">{docNotValidMessage}</p>
      </div>
    </div>
    {verificationStatus && <DetailedErrors verificationStatus={verificationStatus} />}
    {retrieveCertificateByActionError && (
      <ActionError retrieveCertificateByActionError={retrieveCertificateByActionError} />
    )}
    <Link to="/faq">
      <span className={`${sharedViewerInvalidButton}`}>{unverifiedMessage}</span>
    </Link>
    <div className="my-8">
      <span
        onClick={(e) => {
          e.preventDefault();
          resetData();
        }}
        className="text-red-500 underline cursor-pointer hover:text-gray-500"
      >
        {tryAnotherMessage}
      </span>
    </div>
  </div>
);
