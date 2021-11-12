import React, { FunctionComponent } from "react";
import { MESSAGES } from "../../../constants/VerificationErrorMessages";

export const DetailedError: FunctionComponent<{ title: string; message: string }> = ({ title, message }) => {
  return (
    <div className="my-2">
      <h4 className="text-red-500 mb-0">{title}</h4>
      <p className="text-gray-700 break-words">{message}</p>
    </div>
  );
};

export const DetailedErrors: FunctionComponent<{ verificationError: string[] | null }> = ({ verificationError }) => {
  if (!verificationError) return null;
  return (
    <div className="mb-8">
      {verificationError.map((errorType, index) => (
        <DetailedError
          key={index}
          title={MESSAGES[errorType].failureTitle}
          message={MESSAGES[errorType].failureMessage}
        />
      ))}
    </div>
  );
};
