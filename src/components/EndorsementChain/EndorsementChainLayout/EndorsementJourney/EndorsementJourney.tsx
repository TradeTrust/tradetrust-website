// import styled from "@emotion/styled";
import React, { FunctionComponent } from "react";
// import tw from "twin.macro";

interface EndorsementJourneyProps {
  displayDashHead: boolean;
  displayDot: boolean;
  displayDashTail: boolean;
  pathDistance?: number;
}

export const EndorsementJourney: FunctionComponent<EndorsementJourneyProps> = ({
  // displayDashHead,
  displayDot,
  // displayDashTail,
  pathDistance,
}) => {
  let pathHeight = "";
  if (pathDistance) pathHeight = `h-${pathDistance * 20}`;

  console.log(pathHeight);
  return (
    // <Journey>
    //   {/* <div className={`dash-head ${displayDashHead ? "" : "invisible"}`} data-testid="dash-head" /> */}
    //   <div className={`dash-head ${displayDashHead ? "" : "invisible"}`} data-testid="dash-head" />

    //   <div className={displayDot ? "dot" : "invisible"} data-testid="dot" />
    //   {/* <div className={`dash-tail ${displayDashTail ? "" : "invisible"}`} data-testid="dash-tail" /> */}
    // </Journey>

    <div className="absolute bottom-0 left-0 mb-5 z-10">
      <div className={`border-l border-dashed border-rose pl-2`} data-testid="dash-head" />

      <div className={displayDot ? "rounded-full bg-cerulean-200 h-4 w-4 " : "invisible"} data-testid="dot" />
    </div>
  );
};

// const Journey = styled.div`
//   ${tw`absolute z-10 flex flex-col -mt-16`}
//   top: 0;
//   left: 0;
//   width: 0;

//   .dash-head {
//     ${tw`border-l border-dashed border-turquoise flex h-24`}
//     width: 0;
//   }

//   .dot {
//     ${tw`rounded-full bg-turquoise flex`}
//     height: 10px;
//     width: 10px;
//     margin-left: -5px;
//   }

//   .dash-tail {
//     ${tw`border-l border-dashed border-turquoise flex flex-grow`}
//     width: 0;
//   }
// `;
