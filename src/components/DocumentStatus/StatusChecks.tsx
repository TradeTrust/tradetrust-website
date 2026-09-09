import React, { FunctionComponent } from "react";
import { VerificationFragment } from "@trustvc/trustvc";
import { errorMessages, interpretFragments } from "@trustvc/trustvc";

import { StatusCheck } from "./StatusCheck";

interface StatusChecksProps {
  verificationStatus: VerificationFragment[];
  /**
   * The document being reported on is a Verifiable Presentation envelope rather than a single
   * credential.
   */
  isPresentation?: boolean;
}

export const StatusChecks: FunctionComponent<StatusChecksProps> = ({ verificationStatus, isPresentation = false }) => {
  if (!verificationStatus?.length) return null;

  const { hashValid, issuedValid, identityValid } = interpretFragments(verificationStatus);
  const { MESSAGES, TYPES } = errorMessages;

  /**
   * A presentation's envelope carries only two meaningful checks. "Document has been issued" is a
   * per-credential question — issuance belongs to each embedded credential, which shows its own
   * three checks on its tab — so it is deliberately absent here.
   */
  if (isPresentation) {
    return (
      <div className="flex items-start flex-col">
        <div className="w-auto">
          <StatusCheck
            valid={identityValid}
            messageSet={{
              ...MESSAGES[TYPES.IDENTITY],
              successTitle: "Presenter's identity has been identified",
              failureTitle: "Presenter's identity has not been identified",
            }}
          />
        </div>
        <div className="w-auto">
          <StatusCheck
            valid={hashValid}
            messageSet={{
              ...MESSAGES[TYPES.HASH],
              successTitle: "Presentation has not been tampered with",
              failureTitle: "Presentation has been tampered with",
            }}
          />
        </div>
      </div>
    );
  }

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
