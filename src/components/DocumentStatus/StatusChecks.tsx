import React from "react";
import styled from "@emotion/styled";
import { TYPES, MESSAGES } from "../../constants/VerificationErrorMessages";
import { interpretFragments } from "../../services/verify/fragments";
import { mixin, vars } from "../../styles";
import { StatusCheck } from "./StatusCheck";

interface StatusChecks {
  verificationStatus: {
    name: string;
    type: string;
    status: string;
    data: {
      status: string;
      location: string;
    }[];
  }[];
}

export const StatusChecks = styled(({ verificationStatus }: StatusChecks) => {
  const { hashValid, issuedValid, revokedValid, identityValid } = interpretFragments(verificationStatus);

  return (
    <>
      <div className="col-12 col-lg-3 col-xl-2 mb-2 mb-lg-0">
        <StatusCheck valid={hashValid} messageSet={MESSAGES[TYPES.HASH]} />
      </div>
      <div className="col-12 col-lg-3 col-xl-2 mb-2 mb-lg-0">
        <StatusCheck valid={issuedValid} messageSet={MESSAGES[TYPES.ISSUED]} />
      </div>
      <div className="col-12 col-lg-3 col-xl-2 mb-2 mb-lg-0">
        <StatusCheck valid={revokedValid} messageSet={MESSAGES[TYPES.REVOKED]} />
      </div>
      <div className="col-12 col-lg-3 col-xl-2 mb-2 mb-lg-0">
        <StatusCheck valid={identityValid} messageSet={MESSAGES[TYPES.IDENTITY]} />
      </div>
    </>
  );
})`
  .statusbar {
    background-color: ${vars.white};
    padding: 10px 0;
    border-radius: ${vars.buttonRadius};
  }

  svg {
    color: ${vars.teal};

    .x-circle {
      color: ${vars.red};
    }
  }

  .message {
    line-height: 1.2;
    ${mixin.fontSize(14)};
  }
`;
