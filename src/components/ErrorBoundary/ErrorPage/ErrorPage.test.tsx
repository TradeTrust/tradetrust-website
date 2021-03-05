import { render, screen } from "@testing-library/react";
import React from "react";
import { ErrorPage } from "./ErrorPage";

describe("ErrorPage", () => {
  it("should render correctly with the given title and description", () => {
    render(<ErrorPage title="Error" description="Something went wrong!" />);

    expect(screen.getAllByText("Error")).toHaveLength(1);
    expect(screen.getAllByText("Something went wrong!")).toHaveLength(1);
  });
});
