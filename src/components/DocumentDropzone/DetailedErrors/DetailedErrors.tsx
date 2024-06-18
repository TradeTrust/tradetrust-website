import React, { FunctionComponent } from "react";
import { VerificationFragment, VerificationFragmentWithData } from "@tradetrust-tt/tt-verify";
import { CONSTANTS, errorMessageHandling } from "@tradetrust-tt/tradetrust-utils";

export const DetailedError: FunctionComponent<{ title: string; message: string }> = ({ title, message }) => {
  return (
    <div className="my-2 sm:mx-8 xl:mx-16">
      <h4 className="text-scarlet-500 mb-0">{title}</h4>
      <p className="text-cloud-800 break-words">{message}</p>
    </div>
  );
};

export const DetailedErrors: FunctionComponent<{
  verificationStatus: VerificationFragment[] | null;
  verificationError: string | null;
}> = ({ verificationStatus, verificationError }) => {
  if (!verificationStatus) return null;
  const { MESSAGES } = CONSTANTS;
  const idvcFragment = verificationStatus.filter(
    (fragment) => fragment.name === "TradeTrustIDVCIdentityProof" && fragment.status === "ERROR"
  ) as VerificationFragmentWithData[];
  if (idvcFragment.length > 0) {
    return (
      <div className="mb-8">
        <DetailedError title={"Document is invalid"} message={idvcFragment[0].data.message} />
      </div>
    );
  } else {
    const errors = errorMessageHandling(verificationStatus);
    if (verificationError) errors.push(verificationError);

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
  }
};
