import { Textual } from "@tradetrust-tt/tradetrust-ui-components";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { OverlayContextProvider } from "../../../common/contexts/OverlayContext";
import { InfoOverlay } from "./InfoOverlay";

export default {
  title: "UI/Overlay/InfoOverlay",
  component: InfoOverlay,
  parameters: {
    componentSubtitle: "Overlay with Static Content",
  },
};

export const Default = () => {
  return (
    <MemoryRouter>
      <OverlayContextProvider>
        <InfoOverlay>
          <Textual title="A Modal" data-testid="overlay-children">
            Experimental Text
          </Textual>
        </InfoOverlay>
      </OverlayContextProvider>
    </MemoryRouter>
  );
};
