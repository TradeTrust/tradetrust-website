import { OverlayContextProvider, Textual } from "@govtechsg/tradetrust-ui-components";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { StaticOverlay } from "./StaticOverlay";

export default {
  title: "UI/Overlay/StaticOverlay",
  component: StaticOverlay,
  parameters: {
    componentSubtitle: "Overlay with Static Content",
  },
};

export const Default = () => {
  return (
    <MemoryRouter>
      <OverlayContextProvider>
        <StaticOverlay
          buttonText="?"
          className="w-6 h-6 rounded-full font-bold text-cerulean-200 border border-cerulean-200 p-0 ml-3"
        >
          <Textual title="A Modal" data-testid="overlay-children">
            Experimental Text
          </Textual>
        </StaticOverlay>
      </OverlayContextProvider>
    </MemoryRouter>
  );
};
