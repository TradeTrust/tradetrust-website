import React, { FunctionComponent } from "react";
import { VerificationFragment } from "@trustvc/trustvc";
import { errorMessages, errorMessageHandling } from "@trustvc/trustvc";
import { getPresentationError } from "../../../utils/presentationErrors";

export const DetailedError: FunctionComponent<{ title: string; message: string }> = ({ title, message }) => {
  return (
    <div className="my-2 sm:mx-8 xl:mx-16">
      <div className="flex items-center justify-center gap-2">
        <img src="/static/images/dropzone/invalid.svg" alt="Document invalid" className="w-6 h-6" />
        <h4 className="text-scarlet-500 mb-0">{title}</h4>
      </div>
      <p className="text-cloud-800 break-words">{message}</p>
    </div>
  );
};

export const DetailedErrors: FunctionComponent<{
  verificationStatus: VerificationFragment[] | null;
  verificationError: string | null;
  /**
   * The document that was verified. Only needed for a Verifiable Presentation, whose error copy
   * names the embedded credential at fault by the label its tab shows.
   */
  document?: unknown;
}> = ({ verificationStatus, verificationError, document }) => {
  const { MESSAGES } = errorMessages;

  /**
   * A failing presentation reports one accurate error rather than the OpenAttestation-shaped set
   * below. errorMessageHandling was written for OpenAttestation: it sees an invalid
   * DOCUMENT_INTEGRITY and returns HASH for every presentation failure, so an expired or unsigned
   * presentation would be reported as "Document has been tampered with".
   */
  const presentationError = getPresentationError(verificationStatus, document);
  if (presentationError) {
    const messageSet = MESSAGES[presentationError.type];
    return (
      <div className="mb-8">
        <DetailedError
          title={messageSet.failureTitle}
          message={presentationError.message ?? messageSet.failureMessage}
        />
      </div>
    );
  }

  const errors: string[] = [...(verificationStatus ? errorMessageHandling(verificationStatus) : [])];
  if (verificationError) {
    if (Array.isArray(verificationError)) {
      verificationError.forEach((error) => {
        if (MESSAGES[error] && !errors.includes(error)) {
          errors.push(error);
        }
      });
    } else {
      if (MESSAGES[verificationError] && !errors.includes(verificationError)) {
        errors.push(verificationError);
      }
    }
  }

  return (
    <div className="mb-8">
      {errors.map((errorType, index) => (
        <DetailedError
          key={index}
          title={MESSAGES[errorType].failureTitle}
          message={MESSAGES[errorType].failureMessage}
        />
      ))}
    </div>
  );
};
