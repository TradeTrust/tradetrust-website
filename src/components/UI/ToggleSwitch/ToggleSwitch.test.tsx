import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { ToggleSwitch } from "./ToggleSwitch";

describe("ToggleSwitch", () => {
  it("should fire handleToggle when clicked", () => {
    const mockHandleToggle = jest.fn();
    render(<ToggleSwitch isOn={true} handleToggle={mockHandleToggle} />);
    fireEvent.click(screen.getByTestId("toggle-switch"));
    expect(mockHandleToggle).toHaveBeenCalled(); // eslint-disable-line jest/prefer-called-with
  });
  it("should display `ON` when isOn is true", () => {
    render(<ToggleSwitch isOn={true} handleToggle={() => {}} />);
    const toggle: any = screen.getByTestId("toggle-switch");
    expect(toggle.checked).toBeTruthy(); // eslint-disable-line jest/no-truthy-falsy
  });
  it("should display `OFF` when isOn is false", () => {
    render(<ToggleSwitch isOn={false} handleToggle={() => {}} />);
    const toggle: any = screen.getByTestId("toggle-switch");
    expect(toggle.checked).toBeFalsy(); // eslint-disable-line jest/no-truthy-falsy
  });
});
