import { render, screen } from "@testing-library/react";
import React from "react";
import { EndorsementChainError } from "./EndorsementChainError";

describe("EndorsementChainError", () => {
  it("should render default error message correctly", () => {
    render(<EndorsementChainError error={""} />);
    expect(screen.getAllByText("An error has occurred, please try again later.")).toHaveLength(1);
  });

  it("should render error message correctly", () => {
    console.log("UNKNOWN ERROR has occurred,\nplease try again later.");
    render(<EndorsementChainError error={"UNKNOWN ERROR"} />);
    expect(screen.getAllByText("UNKNOWN ERROR has occurred, please try again later.")).toHaveLength(1);
  });
});
