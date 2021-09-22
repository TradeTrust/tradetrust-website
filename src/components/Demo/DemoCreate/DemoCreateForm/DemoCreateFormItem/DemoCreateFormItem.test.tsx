import React from "react";
import { render, screen } from "@testing-library/react";
import { FormItemAccordion, FormItemWithLabel, FormItemWithoutLabel } from "./DemoCreateFormItem.stories";

describe("DemoCreateFormItem", () => {
  it("should render form item accordion", () => {
    render(<FormItemAccordion />);
    expect(screen.getByTestId("accordion-icon")).not.toBeNull();
  });

  it("should render form item with label", () => {
    render(<FormItemWithLabel />);
    expect(screen.getByText("Form Item With Label"));
  });

  it("should render form item without label", () => {
    render(<FormItemWithoutLabel />);
    expect(screen.getByPlaceholderText("Form Item Without Label"));
  });
});
