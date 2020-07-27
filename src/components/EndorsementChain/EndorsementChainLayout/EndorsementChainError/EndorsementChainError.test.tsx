import { render, screen } from "@testing-library/react";
import React from "react";
import { EndorsementChainError } from "./EndorsementChainError";

describe("EndorsementChainError", () => {
  it("should render correctly", () => {
    render(<EndorsementChainError error={""} />);
    expect(screen.getAllByText("An error occured, please try again later.")).toHaveLength(1);
  });

  it("should display error when there is an error", () => {
    render(<EndorsementChainError error={"Some Error"} />);
    expect(screen.getAllByText("Some Error")).toHaveLength(1);
  });
});
