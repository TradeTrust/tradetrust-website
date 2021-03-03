import React from "react";
import { EndorsementJourney } from "./EndorsementJourney";

export default {
  title: "Viewer/EndorsementJourney",
  component: EndorsementJourney,
};

export const All = () => {
  return (
    <div className="relative h-20 m-4">
      <EndorsementJourney displayDashHead={true} displayDot={true} displayDashTail={true} />
    </div>
  );
};

export const noDot = () => {
  return (
    <div className="relative h-20 m-4">
      <EndorsementJourney displayDashHead={true} displayDot={false} displayDashTail={true} />
    </div>
  );
};

export const noHead = () => {
  return (
    <div className="relative h-20 m-4">
      <EndorsementJourney displayDashHead={false} displayDot={true} displayDashTail={true} />
    </div>
  );
};

export const noTail = () => {
  return (
    <div className="relative h-20 m-4">
      <EndorsementJourney displayDashHead={true} displayDot={true} displayDashTail={false} />
    </div>
  );
};
