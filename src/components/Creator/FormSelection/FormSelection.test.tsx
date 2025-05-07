import React from "react";
import { render, screen } from "@testing-library/react";
import { FormSelection } from "./FormSelection";
import { OverlayContext, OverlayContextProps } from "../../../common/contexts/OverlayContext";
import { FormTypes } from "../types";

jest.mock("../FormSelect", () => ({
  FormSelect: ({ form, onCreateDocumentClick }: any) => (
    <div data-testid={`form-select-${form.name}`}>
      {form.name}
      <button onClick={onCreateDocumentClick}>Create</button>
    </div>
  ),
}));

const mockShowOverlay = jest.fn();

const mockFormTypes: FormTypes[] = ["Transferable", "Non-Transferable"];

const mockOverlayContext: OverlayContextProps = {
  overlayContent: null,
  showOverlay: mockShowOverlay,
  closeOverlay: jest.fn(),
  isOverlayVisible: false,
  setOverlayVisible: jest.fn(),
  setCollapsible: jest.fn(),
};

const renderFormSelection = (propsOverride = {}) => {
  const defaultProps = {
    formTypes: mockFormTypes,
    forms: [
      { type: "Transferable", name: "EBL" },
      { type: "Non-Transferable", name: "COO" },
    ],
  };

  return render(
    <OverlayContext.Provider value={mockOverlayContext}>
      <FormSelection {...defaultProps} {...propsOverride} />
    </OverlayContext.Provider>
  );
};

describe("FormSelection component", () => {
  beforeEach(() => {
    mockShowOverlay.mockClear();
  });

  it("renders title and instructions", () => {
    renderFormSelection();
    expect(screen.getByTestId("form-selection-title")).toHaveTextContent("Select documents to preview or create.");
  });

  it("renders each form group and its forms", () => {
    renderFormSelection();
    expect(screen.getByText("Transferable Documents")).toBeInTheDocument();
    expect(screen.getByText("Non-Transferable Documents")).toBeInTheDocument();

    expect(screen.getByTestId("form-select-EBL")).toBeInTheDocument();
    expect(screen.getByTestId("form-select-COO")).toBeInTheDocument();
  });
});
