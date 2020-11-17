import styled from "@emotion/styled";
import { VerificationFragment } from "@govtechsg/oa-verify";
import React from "react";
import { MESSAGES, TYPES } from "../../constants/VerificationErrorMessages";
import { interpretFragments } from "../../services/verify/fragments";
import { mixin, vars } from "../../styles";
import { StatusCheck } from "./StatusCheck";

export const StatusChecks = styled(({ verificationStatus }: { verificationStatus: VerificationFragment[] }) => {
  const { hashValid, issuedValid, identityValid } = interpretFragments(verificationStatus);

  return (
    <>
      <div className="w-full lg:w-4/12 xl:w-2/12 mb-2 lg:mb-0">
        <StatusCheck valid={hashValid} messageSet={MESSAGES[TYPES.HASH]} />
      </div>
      <div className="w-full lg:w-4/12 xl:w-2/12 mb-2 lg:mb-0">
        <StatusCheck valid={issuedValid} messageSet={MESSAGES[TYPES.ISSUED]} />
      </div>
      <div className="w-full lg:w-4/12 xl:w-2/12 mb-2 lg:mb-0">
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
