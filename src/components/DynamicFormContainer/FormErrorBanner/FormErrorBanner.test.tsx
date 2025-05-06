import { render, screen } from "@testing-library/react";
import React from "react";
import { FormErrorBanner } from "./FormErrorBanner";

const errors = [
  {
    keyword: "required",
    instancePath: "",
    schemaPath: "#/required",
    params: { missingProperty: "blNumber" },
    message: "should have required property 'blNumber'",
  },
];

describe("formErrorBanner", () => {
  it("should show errors when there are any", () => {
    render(<FormErrorBanner formErrorTitle="" formErrors={errors} />);
    expect(screen.getByTestId("form-error-banner")).toHaveTextContent("missingProperty: blNumber");
  });

  it("should not display when there are no errors", () => {
    render(<FormErrorBanner formErrorTitle="" formErrors={null} />);
    expect(screen.queryByTestId("form-error-banner")).toBeNull();
  });

  it("should display formErrorTitle correctly", () => {
    render(<FormErrorBanner formErrorTitle="Some error occurred" formErrors={errors} />);
    expect(screen.getByText("Some error occurred")).not.toBeNull();
  });
});
