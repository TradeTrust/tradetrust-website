import React from "react";

import { render, screen } from "@testing-library/react";
import { DemoCreateReview } from "./index";

describe("DemoCreateReview", () => {
  it("should render the review page", () => {
    render(<DemoCreateReview />);

    expect(screen.getByTestId("progress-bar-step-2")).not.toBeNull();
  });
});
