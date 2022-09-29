import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ButtonVideo } from "./ButtonVideo";
import { OverlayContextProvider, Overlay } from "@govtechsg/tradetrust-ui-components";

const RenderWithOverlay = ({ children }: any) => {
  return (
    <OverlayContextProvider>
      {children}
      <Overlay />
    </OverlayContextProvider>
  );
};

describe("ButtonVideo", () => {
  it("should render play button correctly", () => {
    render(
      <RenderWithOverlay>
        <ButtonVideo>
          <video src="foobar.mp4" data-testid="foo" />
        </ButtonVideo>
      </RenderWithOverlay>
    );
    expect(screen.getByTestId("play-button").querySelector("i")?.classList.contains("fa-play")).toBe(true);
    expect(screen.queryByTestId("foo")).not.toBeInTheDocument();
  });

  it("should render overlay correctly", () => {
    render(
      <RenderWithOverlay>
        <ButtonVideo>
          <video src="foobar.mp4" data-testid="foo" />
        </ButtonVideo>
      </RenderWithOverlay>
    );
    fireEvent.click(screen.getByTestId("play-button"));
    expect(screen.getByTestId("foo")).toBeInTheDocument();
  });
});
