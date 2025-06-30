import { render, screen } from "@testing-library/react";
import React from "react";
import { ProgressBar } from "./ProgressBar";

describe("progressBar", () => {
  it("should display progress correctly when step is 1", () => {
    render(<ProgressBar step={1} totalSteps={3} />);
    expect(screen.getByTestId("progress-bar-step-1")).not.toBeNull();
  });

  it("should display progress correctly when step is 2", () => {
    render(<ProgressBar step={2} totalSteps={3} />);
    expect(screen.getByTestId("progress-bar-step-2")).not.toBeNull();
  });

  it("should display progress correctly when step is 3", () => {
    render(<ProgressBar step={3} totalSteps={3} />);
    expect(screen.getByTestId("progress-bar-step-3")).not.toBeNull();
  });
});
