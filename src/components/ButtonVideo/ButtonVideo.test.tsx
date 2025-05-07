import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { OverlayContextProvider } from "../../common/contexts/OverlayContext";
import { Overlay } from "../UI/Overlay";
import { ButtonVideo } from "./ButtonVideo";

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
