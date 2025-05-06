import { render, screen } from "@testing-library/react";
import React from "react";
import { FormTemplate, FormType } from "../../../types";
import { DynamicForm } from "./DynamicForm";
import sampleConfig from "../../../config/formSchemas/bill_of_lading.json";

const form = sampleConfig as FormTemplate;

const mockSetFormData = jest.fn();
const mockSetOwnership = jest.fn();
const mockSetCurrentForm = jest.fn();

const commonProps = {
  type: "TRANSFERABLE_RECORD" as FormType,
  schema: form.schema,
  form: {
    fileName: "",
    data: { formData: {} },
    ownership: { beneficiaryAddress: "", holderAddress: "" },
    remarks: "",
    extension: "tt",
  },
  setFormData: mockSetFormData,
  setOwnership: mockSetOwnership,
  setCurrentForm: mockSetCurrentForm,
  attachmentAccepted: false,
};

describe("DynamicForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders fields from the form definition", () => {
    render(<DynamicForm {...commonProps} />);
    expect(screen.getByLabelText("BL Number*")).toBeInTheDocument();
  });

  describe("Attachment dropzone", () => {
    it("renders when attachment is accepted", () => {
      render(<DynamicForm {...commonProps} attachmentAccepted={true} />);
      expect(screen.getByTestId("attachment-dropzone")).toBeInTheDocument();
    });

    it("does not render when attachment is not accepted", () => {
      render(<DynamicForm {...commonProps} attachmentAccepted={false} />);
      expect(screen.queryByTestId("attachment-dropzone")).not.toBeInTheDocument();
    });
  });

  it("renders the data file dropzone", () => {
    render(<DynamicForm {...commonProps} />);
    expect(screen.getByTestId("data-file-dropzone")).toBeInTheDocument();
  });
});
