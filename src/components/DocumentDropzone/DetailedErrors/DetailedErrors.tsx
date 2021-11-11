import React, { FunctionComponent } from "react";
import { VerificationFragment } from "@govtechsg/oa-verify";
import { errorMessageHandling } from "../../../services/verify/fragments";
import { MESSAGES, TYPES } from "../../../constants/VerificationErrorMessages";

export const DetailedError: FunctionComponent<{ title: string; message: string }> = ({ title, message }) => {
  return (
    <div className="my-2">
      <h4 className="text-red-500 mb-0">{title}</h4>
      <p className="text-gray-700 break-words">{message}</p>
    </div>
  );
};

export const DetailedErrors: FunctionComponent<{ verificationStatus: VerificationFragment[] | null }> = ({
  verificationStatus,
}) => {
  if (!verificationStatus) return null;

  let errors: string[] = [];

  try {
    errors = errorMessageHandling(verificationStatus);
  } catch (e) {
    errors.push(TYPES.INVALID);
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
