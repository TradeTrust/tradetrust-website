import React from "react";
import { FiatLabel } from "./FiatLabel";
import { render, screen } from "@testing-library/react";

describe("FiatLabel", () => {
  it("should render FiatLabel component correctly", () => {
    render(<FiatLabel>15.4</FiatLabel>);

    expect(screen.getByText("$15.40")).toBeInTheDocument();
  });
});
