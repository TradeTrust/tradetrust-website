import React from "react";

import { render, screen } from "@testing-library/react";
import { DemoCreateForm } from "./index";

describe("DemoCreateForm", () => {
  it("should render the review page", () => {
    render(<DemoCreateForm />);

    expect(screen.getByTestId("progress-bar-step-1")).not.toBeNull();
  });
});
