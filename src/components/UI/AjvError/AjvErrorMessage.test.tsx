import { render, screen } from "@testing-library/react";
import React from "react";
import { AdditionalPropertyError, Default as AjvErrorMessage, FormatError } from "./AjvErrorMessage.stories";

describe("AjvErrorMessage", () => {
  it("should show formatted correct error message", () => {
    render(<AjvErrorMessage />);
    expect(screen.getByTestId("ajv-error-msg").textContent).toBe("'age' property type must be number");
  });

  it("should show formatted correct error message", () => {
    render(<FormatError />);
    expect(screen.getByTestId("ajv-error-msg").textContent).toBe("property 'email' must match format 'email'");
  });

  it("should show formatted correct error message", () => {
    render(<AdditionalPropertyError />);
    expect(screen.getByTestId("ajv-error-msg").textContent).toBe("'extraField' property is not expected to be here");
  });
});
