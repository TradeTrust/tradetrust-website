import { render, screen } from "@testing-library/react";
import React from "react";
import { ErrorPage } from "./ErrorPage";

describe("errorPage", () => {
  it("should render correctly with the given title and description", () => {
    render(
      <ErrorPage
        pageTitle="Error"
        header="Oops!"
        description="Something went wrong"
        image={"/static/images/errorpage/error-boundary.png"}
      />
    );

    expect(screen.getAllByText("Error")).toHaveLength(1);
    expect(screen.getAllByText("Oops!")).toHaveLength(1);
    expect(screen.getAllByText("Something went wrong")).toHaveLength(1);
  });
});
