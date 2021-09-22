import React from "react";

import { render, screen } from "@testing-library/react";
import { DemoCreateStart } from "./index";

describe("DemoCreateStart", () => {
  it("should render the start page", () => {
    render(<DemoCreateStart />);

    expect(screen.getByText("Start Now")).not.toBeNull();
  });
});
