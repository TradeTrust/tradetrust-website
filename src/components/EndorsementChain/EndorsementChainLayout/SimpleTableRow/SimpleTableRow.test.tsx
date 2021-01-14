import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { format } from "date-fns";
import React from "react";
import { SimpleTableRow } from "./SimpleTableRow";

describe("SimpleTableRow", () => {
  it("should display the actionTitle, date, displayDashHead, displayDot and displayDashTail correctly", () => {
    render(
      <table>
        <tbody>
          <SimpleTableRow
            key={1}
            index={1}
            date={format(new Date(1594608809000), "do MMM yyyy, hh:mm aa")}
            actionTitle="Document surrendered to issuer"
            displayDashHead={true}
            displayDot={true}
            displayDashTail={true}
          />
        </tbody>
      </table>
    );

    expect(screen.getAllByText("Document surrendered to issuer")).toHaveLength(1);
    expect(screen.queryAllByTestId("date")).toHaveLength(1);
  });

  it("should not display the date, displayDashHead, displayDot and displayDashTail when value is undefined or false", () => {
    render(
      <table>
        <tbody>
          <SimpleTableRow
            key={1}
            index={1}
            actionTitle="Document surrendered to issuer"
            displayDashHead={false}
            displayDot={false}
            displayDashTail={false}
          />
        </tbody>
      </table>
    );

    expect(screen.getAllByText("Document surrendered to issuer")).toHaveLength(1);
    expect(screen.queryAllByTestId("date")).toHaveLength(0);
  });
});
