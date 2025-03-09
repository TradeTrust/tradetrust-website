import React, { FunctionComponent } from "react";
import { VerificationFragment } from "@trustvc/trustvc";
import { errorMessages, interpretFragments } from "@trustvc/trustvc";

import { StatusCheck } from "./StatusCheck";

interface StatusChecksProps {
  verificationStatus: VerificationFragment[];
}

export const StatusChecks: FunctionComponent<StatusChecksProps> = ({ verificationStatus }) => {
  if (!verificationStatus?.length) return null;

  const { hashValid, issuedValid, identityValid } = interpretFragments(verificationStatus);
  const { MESSAGES, TYPES } = errorMessages;

  return (
    <div className="flex items-start flex-col">
      <div className="w-auto">
        <StatusCheck valid={issuedValid} messageSet={MESSAGES[TYPES.ISSUED]} />
      </div>
      <div className="w-auto">
        <StatusCheck valid={identityValid} messageSet={MESSAGES[TYPES.IDENTITY]} />
      </div>
      <div className="w-auto">
        <StatusCheck valid={hashValid} messageSet={MESSAGES[TYPES.HASH]} />
      </div>
    </div>
  );
};
