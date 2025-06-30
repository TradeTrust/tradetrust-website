import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { OverlayContextProvider } from "../../../common/contexts/OverlayContext";
import { InfoOverlay, InfoOverlayProps } from "./InfoOverlay";
import { Overlay } from "./Overlay";
import { Textual } from "./OverlayContent";

const mockOverlayProps: InfoOverlayProps = {
  children: <Textual title="Network Selector">Experimental Text</Textual>,
  className: "w-6 h-6",
};

describe("StaticOverlay", () => {
  it("should render button correctly", () => {
    const container = render(
      <MemoryRouter>
        <OverlayContextProvider>
          <Overlay />
          <InfoOverlay className={mockOverlayProps.className}>{mockOverlayProps.children}</InfoOverlay>
        </OverlayContextProvider>
      </MemoryRouter>
    );

    const renderedButton = container.getByRole("img");
    expect(renderedButton).not.toBeNull();
    expect(renderedButton.parentElement?.className).toContain(mockOverlayProps.className);
  });

  it("should render the children correctly", () => {
    const container = render(
      <MemoryRouter>
        <OverlayContextProvider>
          <Overlay />
          <InfoOverlay className={mockOverlayProps.className}>{mockOverlayProps.children}</InfoOverlay>
        </OverlayContextProvider>
      </MemoryRouter>
    );

    fireEvent.click(container.getByRole("img"));

    const overlayChildren = container.getAllByRole(Textual);
    expect(overlayChildren).not.toBeNull();
  });
});
