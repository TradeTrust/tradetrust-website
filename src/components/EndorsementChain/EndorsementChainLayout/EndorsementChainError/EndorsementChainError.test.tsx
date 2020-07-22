import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { EndorsementChainError } from "./EndorsementChainError";

describe("EndorsementChainError", () => {
  it("should render correctly", () => {
    render(<EndorsementChainError error={"Some Error"} setShowEndorsementChain={() => {}} />);
    expect(
      screen.getAllByText("There seem to be an error loading the endorsement chain, please try again later.")
    ).toHaveLength(1);
  });

  it("should display error when there is an error", () => {
    render(<EndorsementChainError error={"Some Error"} setShowEndorsementChain={() => {}} />);
    expect(screen.getAllByText("Some Error")).toHaveLength(1);
  });

  it("should fire setShowEndorsementChain when back button is clicked", () => {
    const mockSetShowEndorsementChainFn = jest.fn();
    render(<EndorsementChainError error={"Some Error"} setShowEndorsementChain={mockSetShowEndorsementChainFn} />);
    fireEvent.click(screen.getByTestId("back-button"));
    expect(mockSetShowEndorsementChainFn).toHaveBeenCalledTimes(1);
  });
});
