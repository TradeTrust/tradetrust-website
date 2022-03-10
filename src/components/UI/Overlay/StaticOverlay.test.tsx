import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { StaticOverlay, StaticOverlayProps } from "./StaticOverlay";
import { MemoryRouter } from "react-router-dom";
import { OverlayContextProvider, Textual } from "@govtechsg/tradetrust-ui-components";

const mockOverlayProps: StaticOverlayProps = {
  buttonText: "?",
  className: "w-6 h-6 rounded-full font-bold text-cerulean-200 border border-cerulean-200 p-0 ml-3",
  children: <Textual title="Network Selector">Experimental Text</Textual>,
};

describe("StaticOverlay", () => {
  it("should render button correctly", () => {
    const container = render(
      <MemoryRouter>
        <OverlayContextProvider>
          <StaticOverlay buttonText={mockOverlayProps.buttonText} className={mockOverlayProps.className}>
            {mockOverlayProps.children}
          </StaticOverlay>
        </OverlayContextProvider>
      </MemoryRouter>
    );

    const renderedButton = container.getByText(mockOverlayProps.buttonText);
    expect(renderedButton).not.toBeNull();
    expect(renderedButton.className).toContain(mockOverlayProps.className);
  });

  it("should render the children correctly", () => {
    const container = render(
      <MemoryRouter>
        <OverlayContextProvider>
          <StaticOverlay buttonText={mockOverlayProps.buttonText} className={mockOverlayProps.className}>
            {mockOverlayProps.buttonText}
          </StaticOverlay>
        </OverlayContextProvider>
      </MemoryRouter>
    );

    fireEvent.click(container.getByText("?"));

    const overlayChildren = container.getAllByRole(Textual);
    expect(overlayChildren).not.toBeNull();
  });
});
