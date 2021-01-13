import { render, screen } from "@testing-library/react";
import React from "react";
import { EndorsementChainError } from "./EndorsementChainError";

describe("EndorsementChainError", () => {
  it("should render correctly", () => {
    render(
      <table>
        <tbody>
          <EndorsementChainError error={""} />
        </tbody>
      </table>
    );
    expect(screen.getAllByText("An error occurred, please try again later.")).toHaveLength(1);
  });

  it("should display error when there is an error", () => {
    render(
      <table>
        <tbody>
          <EndorsementChainError error={"Some Error"} />
        </tbody>
      </table>
    );
    expect(screen.getAllByText("Some Error")).toHaveLength(1);
  });
});
