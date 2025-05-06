import { render, screen } from "@testing-library/react";
import React from "react";
import { Default as AjvErrorMessage } from "./AjvErrorMessage.stories";

describe("AjvErrorMessage", () => {
  it("should show formatted correct error message", () => {
    render(<AjvErrorMessage />);
    expect(screen.getByTestId("ajv-error-msg").textContent).toBe("additionalProperty: supplyChainConsignment");
  });
});
