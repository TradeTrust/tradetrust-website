import React from "react";
import { render, screen } from "@testing-library/react";
import {
  FormItemAccordion,
  FormItemUpload,
  FormItemWithLabel,
  FormItemWithoutLabel,
} from "./DemoCreateFormItem.stories";

describe("DemoCreateFormItem", () => {
  it("should render form item accordion", () => {
    render(<FormItemAccordion />);
    expect(screen.getByTestId("accordion-icon")).not.toBeNull();
  });

  it("should render form item with label", () => {
    render(<FormItemWithLabel />);
    expect(screen.getByTestId("form-item-input")).not.toBeNull();
    expect(screen.queryByText("Form Item With Label")).not.toBeNull();
  });

  it("should render form item without label", async () => {
    render(<FormItemWithoutLabel />);
    expect(screen.getByTestId("form-item-input")).not.toBeNull();
    expect(screen.queryByText("Form Item Without Label")).toBeNull();
  });

  it("should render form item upload", () => {
    render(<FormItemUpload />);
    expect(screen.getByTestId("form-item-dropzone")).not.toBeNull();
  });
});
