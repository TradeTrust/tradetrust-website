import styled from "@emotion/styled";
import React, { FunctionComponent } from "react";
import tw from "twin.macro";

interface EndorsementJourneyProps {
  displayDashHead: boolean;
  displayDot: boolean;
  displayDashTail: boolean;
}

export const EndorsementJourney: FunctionComponent<EndorsementJourneyProps> = ({
  displayDashHead,
  displayDot,
  displayDashTail,
}) => {
  return (
    <Journey>
      <div className={`dash-head ${displayDashHead ? "" : "invisible"}`} data-testid="dash-head" />
      <div className={displayDot ? "dot" : "invisible"} data-testid="dot" />
      <div className={`dash-tail ${displayDashTail ? "" : "invisible"}`} data-testid="dash-tail" />
    </Journey>
  );
};

const Journey = styled.div`
  ${tw`absolute z-10 flex flex-col h-full`}
  top: 0;
  left: 0;
  width: 0;

  .dash-head {
    ${tw`border-l border-dashed border-teal flex h-6`}
    width: 0;
  }

  .dot {
    ${tw`rounded-full bg-teal flex`}
    height: 10px;
    width: 10px;
    margin-left: -5px;
  }

  .dash-tail {
    ${tw`border-l border-dashed border-teal flex flex-grow`}
    width: 0;
  }
`;
