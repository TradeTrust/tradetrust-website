import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router";
import { DynamicFormLayout } from "./DynamicFormLayout";
import { useFormsContext } from "../../../common/contexts/FormsContext";

jest.mock("../../../common/contexts/FormsContext");

const mockUseFormsContext = useFormsContext as jest.Mock;
const mockSetForms = jest.fn();
const mockSetCurrentFormData = jest.fn();
const mockSetCurrentForm = jest.fn();

const whenActiveFormIsAvailable = (): void => {
  mockUseFormsContext.mockReturnValue({
    setForm: mockSetForms,
    setCurrentFormData: mockSetCurrentFormData,
    setCurrentForm: mockSetCurrentForm,
    forms: {
      fileName: "document-1",
      data: { formData: {} },
      ownership: { holderAddress: "", beneficiaryAddress: "" },
      remarks: "",
    },

    currentForm: {
      fileName: "document-1",
      data: { formData: {} },
      ownership: { holderAddress: "", beneficiaryAddress: "" },
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

const whenIsTransferableRecord = (): void => {
  mockUseFormsContext.mockReturnValue({
    setForm: mockSetForms,
    setCurrentFormData: mockSetCurrentFormData,
    setCurrentForm: mockSetCurrentForm,
    forms: {
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
      name: "Bill of Lading",
      type: "TRANSFERABLE_RECORD",
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

const mockData = (files: File[]): any => {
  return {
    dataTransfer: {
      files,
      items: files.map((file: any) => ({
        kind: "file",
        type: file.type,
        getAsFile: () => file,
      })),
      types: ["Files"],
    },
  };
};

describe("dynamicFormLayout", () => {
  beforeEach(() => {
    mockSetForms.mockReset();
  });

  it("should render the progress bar", () => {
    whenActiveFormIsAvailable();
    render(
      <MemoryRouter>
        <DynamicFormLayout />
      </MemoryRouter>
    );
    expect(screen.getByTestId("progress-bar")).not.toBeNull();
  });

  it("should render the cancel button", () => {
    whenActiveFormIsAvailable();
    render(
      <MemoryRouter>
        <DynamicFormLayout />
      </MemoryRouter>
    );
    expect(screen.getByTestId("form-cancel-button")).not.toBeNull();
  });

  it("should render the next button", () => {
    whenActiveFormIsAvailable();
    render(
      <MemoryRouter>
        <DynamicFormLayout />
      </MemoryRouter>
    );
    expect(screen.getByTestId("form-submit-button")).not.toBeNull();
  });

  it("should render the active form", () => {
    whenActiveFormIsAvailable();
    render(
      <MemoryRouter>
        <DynamicFormLayout />
      </MemoryRouter>
    );
    expect(screen.getByLabelText("Foo Field")).not.toBeUndefined();
  });

  it("should display the modal when cancel button is clicked", () => {
    whenActiveFormIsAvailable();
    render(
      <MemoryRouter>
        <DynamicFormLayout />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId("form-cancel-button"));
    expect(screen.getByTestId("modal-title")).not.toBeNull();
  });

  it("should merge the data with defaults and file drop and fire handleSubmit when form is submitted", async () => {
    whenActiveFormIsAvailable();
    render(
      <MemoryRouter>
        <DynamicFormLayout />
      </MemoryRouter>
    );

    // Drop data file in drop zone
    const dropzone = screen.getByTestId("data-file-dropzone");
    const file = new File(
      [
        JSON.stringify({
          data: {
            cow: "moo",
          },
        }),
      ],
      "sample.json",
      {
        type: "application/json",
      }
    );
    const data = mockData([file]);
    const event = new Event("drop", { bubbles: true });
    Object.assign(event, data);

    await act(async () => {
      await fireEvent(dropzone, event);
    });
    await waitFor(() =>
      expect(mockSetCurrentForm).toHaveBeenCalledWith({
        data: {
          formData: {
            cow: "moo",
          },
          undefined: undefined, //no ownership set
        },
      })
    );
  });

  it("should show the TransferableRecordForm when a form is a transferable record", () => {
    whenIsTransferableRecord();
    render(
      <MemoryRouter>
        <DynamicFormLayout />
      </MemoryRouter>
    );
    expect(screen.getByTestId("transferable-record-form")).not.toBeNull();
    expect(screen.queryAllByText("Owner Wallet Address")).toHaveLength(1);
    expect(screen.queryAllByText("Holder Wallet Address")).toHaveLength(1);
  });
});
