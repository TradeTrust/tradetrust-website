import { render, screen } from "@testing-library/react";
import React from "react";
import { CustomObjectFieldTemplate, CustomTitle } from "./CustomObjectField";

const mockProperties = new Array(2).fill(null).map((_arr, index) => {
  return {
    content: <div>Properties Component {index}</div>,
  };
});

const whenAllFieldsArePresent = (): any => {
  return {
    properties: mockProperties,
    title: "Component Title",
    description: "Component Description",
    required: false,
  };
};

describe("CustomObjectFieldTemplate", () => {
  it("should render all fields correctly", () => {
    render(<CustomObjectFieldTemplate {...whenAllFieldsArePresent()} />);
    expect(screen.getByText("Component Description")).not.toBeNull();
    expect(screen.getByText("Component Title")).not.toBeNull();
    expect(screen.getAllByText(/Properties Component/)).not.toBeNull();
  });

  it("should render all properties in a list", () => {
    render(<CustomObjectFieldTemplate {...whenAllFieldsArePresent()} />);
    expect(screen.getAllByText(/Properties Component/)).toHaveLength(2);
  });
});

describe("CustomTitle", () => {
  it("should render title text", () => {
    render(<CustomTitle title={`foobar`} />);
    expect(screen.getByText(/foobar/)).toBeInTheDocument();
  });

  it("should render divider when title exist", () => {
    render(<CustomTitle title={`foobar`} />);
    expect(screen.getByTestId("custom-title-divider")).toBeInTheDocument();
  });
});
