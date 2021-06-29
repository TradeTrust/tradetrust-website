import { render, screen } from "@testing-library/react";
import React from "react";
import { EndorsementJourney } from "./EndorsementJourney";

describe("EndorsementJourney", () => {
  it("should render endorsement journey correctly when all set to 'true'", () => {
    render(
      <div>
        <EndorsementJourney displayDashHead={true} displayDot={true} displayDashTail={true} />
      </div>
    );

    expect(screen.getByTestId("dash-head")).toHaveClass("dash-head");
    expect(screen.getByTestId("dash-head")).not.toHaveClass("invisible");
    expect(screen.getByTestId("dash-tail")).toHaveClass("dash-tail");
    expect(screen.getByTestId("dash-tail")).not.toHaveClass("invisible");
    expect(screen.getByTestId("dot")).toHaveClass("dot");
    expect(screen.getByTestId("dot")).not.toHaveClass("invisible");
  });

  it("should render endorsement journey correctly when 'displayDashHead' is 'false'", () => {
    render(
      <div>
        <EndorsementJourney displayDashHead={false} displayDot={true} displayDashTail={true} />
      </div>
    );

    expect(screen.getByTestId("dash-head")).toHaveClass("dash-head");
    expect(screen.getByTestId("dash-head")).toHaveClass("invisible");
    expect(screen.getByTestId("dash-tail")).toHaveClass("dash-tail");
    expect(screen.getByTestId("dash-tail")).not.toHaveClass("invisible");
    expect(screen.getByTestId("dot")).toHaveClass("dot");
    expect(screen.getByTestId("dot")).not.toHaveClass("invisible");
  });

  it("should render endorsement journey correctly when 'displayDot' is 'false'", () => {
    render(
      <div>
        <EndorsementJourney displayDashHead={true} displayDot={false} displayDashTail={true} />
      </div>
    );

    expect(screen.getByTestId("dash-head")).toHaveClass("dash-head");
    expect(screen.getByTestId("dash-head")).not.toHaveClass("invisible");
    expect(screen.getByTestId("dash-tail")).toHaveClass("dash-tail");
    expect(screen.getByTestId("dash-tail")).not.toHaveClass("invisible");
    expect(screen.getByTestId("dot")).not.toHaveClass("dot");
    expect(screen.getByTestId("dot")).toHaveClass("invisible");
  });

  it("should render endorsement journey correctly when 'displayDashTail' is 'false'", () => {
    render(
      <div>
        <EndorsementJourney displayDashHead={true} displayDot={true} displayDashTail={false} />
      </div>
    );

    expect(screen.getByTestId("dash-head")).toHaveClass("dash-head");
    expect(screen.getByTestId("dash-head")).not.toHaveClass("invisible");
    expect(screen.getByTestId("dash-tail")).toHaveClass("dash-tail");
    expect(screen.getByTestId("dash-tail")).toHaveClass("invisible");
    expect(screen.getByTestId("dot")).toHaveClass("dot");
    expect(screen.getByTestId("dot")).not.toHaveClass("invisible");
  });
});
