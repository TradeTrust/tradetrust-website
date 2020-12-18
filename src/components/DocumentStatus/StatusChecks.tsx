import styled from "@emotion/styled";
import { VerificationFragment } from "@govtechsg/oa-verify";
import React from "react";
import tw from "twin.macro";
import { MESSAGES, TYPES } from "../../constants/VerificationErrorMessages";
import { interpretFragments } from "../../services/verify/fragments";
import { StatusCheck } from "./StatusCheck";

export const StatusChecks = styled(({ verificationStatus }: { verificationStatus: VerificationFragment[] }) => {
  const { hashValid, issuedValid, identityValid } = interpretFragments(verificationStatus);

  return (
    <div className="flex items-start flex-col mt-2 lg:flex-row lg:justify-between xl:mt-0">
      <div className="w-auto mx-0 lg:mx-2 mb-2 lg:mb-0">
        <StatusCheck valid={hashValid} messageSet={MESSAGES[TYPES.HASH]} />
      </div>
      <div className="w-auto mx-0 lg:mx-2 mb-2 lg:mb-0">
        <StatusCheck valid={issuedValid} messageSet={MESSAGES[TYPES.ISSUED]} />
      </div>
      <div className="w-auto mx-0 lg:mx-2 mb-2 lg:mb-0">
        <StatusCheck valid={identityValid} messageSet={MESSAGES[TYPES.IDENTITY]} />
      </div>
    </div>
  );
})`
  .statusbar {
    ${tw`bg-white py-2 px-0 rounded`}
  }

  svg {
    ${tw`text-teal`}

    .x-circle {
      ${tw`text-red`}
    }
  }

  .message {
    ${tw`leading-5 text-sm`}
  }
`;
