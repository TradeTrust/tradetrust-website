import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import { ErrorPage } from "./ErrorPage";

describe("ErrorPage", () => {
  it("should render correctly with the given title and description", () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <ErrorPage title="Error" description="Something went wrong!" />
      </Router>
    );

    expect(screen.getAllByText("Error")).toHaveLength(1);
    expect(screen.getAllByText("Something went wrong!")).toHaveLength(1);
  });
});
