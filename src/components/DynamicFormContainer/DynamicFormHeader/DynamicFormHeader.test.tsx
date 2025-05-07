import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { DynamicFormHeader } from "./DynamicFormHeader";
import { useFormsContext } from "../../../common/contexts/FormsContext";

jest.mock("../../../common/contexts/FormsContext");

const mockUseFormsContext = useFormsContext as jest.Mock;
const mockSetActiveFormIndex = jest.fn();
const mockSetForms = jest.fn();
const mockClosePreviewMode = jest.fn();

const whenActiveFormsAreAvailable = (): void => {
  mockUseFormsContext.mockReturnValue({
    setForms: mockSetForms,
    setActiveFormIndex: mockSetActiveFormIndex,
    form: {
      fileName: "document-1",
      data: { formData: {} },
      ownership: { holderAddress: "", beneficiaryAddress: "" },
      remarks: "",
    },
    currentForm: {
      fileName: "document-1",
      data: { formData: {} },
      ownership: { holderAddress: "", beneficiaryAddress: "" },
      remarks: "",
    },
    currentFormTemplate: {
      name: "COO",
      type: "VERIFIABLE_DOCUMENT",
      defaults: {},
      schema: {
        type: "object",
        properties: {
          foo: { type: "string", title: "Foo Field" },
          bar: { type: "string" },
        },
      },
    },
  });
};

describe("DynamicFormHeader", () => {
  beforeEach(() => {
    mockSetActiveFormIndex.mockReset();
    mockSetForms.mockReset();
    mockClosePreviewMode.mockReset();
  });

  it("should display the header UI correctly", () => {
    whenActiveFormsAreAvailable();
    render(
      <MemoryRouter>
        <DynamicFormHeader onBackToFormSelection={() => {}} onFormSubmit={() => {}} formErrors={[]} formErrorTitle="" />
      </MemoryRouter>
    );

    expect(screen.getByText("Fill Form")).toBeInTheDocument();
    expect(screen.getByTestId("form-cancel-button")).toBeInTheDocument();
    expect(screen.getByTestId("form-submit-button")).toBeInTheDocument();
  });

  it("should fire the 'cancel' function when cancel button is clicked", () => {
    whenActiveFormsAreAvailable();
    const mockOnBackToFormSelection = jest.fn();
    render(
      <MemoryRouter>
        <DynamicFormHeader
          onBackToFormSelection={mockOnBackToFormSelection}
          onFormSubmit={() => {}}
          formErrors={[]}
          formErrorTitle=""
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId("form-cancel-button"));
    fireEvent.click(screen.getByTestId("confirm-modal-confirm-button"));
    expect(mockOnBackToFormSelection).toHaveBeenCalledTimes(1);
  });

  it("should fire the 'submit' function when submit button is clicked", () => {
    whenActiveFormsAreAvailable();
    const mockonFormSubmit = jest.fn();
    render(
      <MemoryRouter>
        <DynamicFormHeader
          onBackToFormSelection={() => {}}
          onFormSubmit={mockonFormSubmit}
          formErrors={[]}
          formErrorTitle=""
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId("form-submit-button"));
    expect(mockonFormSubmit).toHaveBeenCalledTimes(1);
  });

  it("should display form errors correctly", () => {
    whenActiveFormsAreAvailable();
    render(
      <MemoryRouter>
        <DynamicFormHeader
          onBackToFormSelection={() => {}}
          onFormSubmit={() => {}}
          formErrors={[
            {
              message: "Form must have required property 'foo'",
              path: ".foo",
              context: {
                errorType: "required",
              },
            },
          ]}
          formErrorTitle="Form Error"
        />
      </MemoryRouter>
    );

    expect(screen.getByText("Form Error")).toBeInTheDocument();
    expect(screen.getByTestId("form-error-banner")).toHaveTextContent("Form must have required property 'foo'");
  });
});
