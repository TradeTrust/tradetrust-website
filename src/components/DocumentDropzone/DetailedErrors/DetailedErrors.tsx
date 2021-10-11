import React, { FunctionComponent } from "react";
import { VerificationFragment } from "@govtechsg/oa-verify";
import { interpretFragments } from "../../../services/verify/fragments";
import { MESSAGES, TYPES } from "../../../constants/VerificationErrorMessages";

export const DetailedErrors: FunctionComponent<{ verificationStatus: VerificationFragment[] | null }> = ({
  verificationStatus,
}) => {
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
