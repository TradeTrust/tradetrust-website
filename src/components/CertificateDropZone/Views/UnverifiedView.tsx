import { VerificationFragment } from "@govtechsg/oa-verify";
import React from "react";
import { Link } from "react-router-dom";
import { MESSAGES, TYPES } from "../../../constants/VerificationErrorMessages";
import { interpretFragments } from "../../../services/verify/fragments";
import { ViewerContainer } from "./SharedViewerStyledComponents";
import { docNotValidMessage, tryAnotherMessage, unverifiedMessage } from "./";
import { WrappedOrSignedOpenAttestationDocument } from "../../../utils/shared";

const DetailedErrors = ({ verificationStatus }: { verificationStatus: VerificationFragment[] }) => {
  const errors = [];

  const { hashValid, issuedValid, identityValid } = interpretFragments(verificationStatus);

  if (!hashValid) errors.push(TYPES.HASH);
  if (!issuedValid) errors.push(TYPES.ISSUED);
  if (!identityValid) errors.push(TYPES.IDENTITY);

  return (
    <div data-testid="error-tab" className="verifications">
      {errors.map((errorType, index) => (
        <div key={index}>
          <p className="messages">{MESSAGES[errorType].failureTitle}</p>
          <p className="break-words text-black">{MESSAGES[errorType].failureMessage}</p>
        </div>
      ))}
    </div>
  );
};

interface UnverifiedViewProps {
  handleRenderOverwrite?: () => void;
  resetData: () => void;
  document?: WrappedOrSignedOpenAttestationDocument;
  verificationStatus: VerificationFragment[];
}

export const UnverifiedView = ({ resetData, verificationStatus }: UnverifiedViewProps): React.ReactElement => (
  <ViewerContainer id="viewer-container" className="invalid">
    <div className="flex justify-center items-center my-4">
      <div className="w-auto mr-2">
        <img src="/static/images/dropzone/invalid.svg" alt="The Certificate is invalid" />
      </div>
      <div className="w-auto">
        <p className="invalid text-black text-2xl">{docNotValidMessage}</p>
      </div>
    </div>
    <DetailedErrors verificationStatus={verificationStatus} />

    <div className="unverified-btn-container">
      <Link to="/faq">
        <span className="unverified-btn">{unverifiedMessage}</span>
      </Link>
    </div>

    <div className="secondary-links">
      <span
        onClick={(e) => {
          e.preventDefault();
          resetData();
        }}
        className="text-link"
      >
        {tryAnotherMessage}
      </span>
    </div>
  </ViewerContainer>
);
