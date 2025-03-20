import React, { FunctionComponent } from "react";
import { VerificationFragment } from "@trustvc/trustvc";
import { errorMessages, errorMessageHandling } from "@trustvc/trustvc";

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
}> = ({ verificationStatus, verificationError }) => {
  const { MESSAGES } = errorMessages;
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
