import React, { FunctionComponent } from "react";
import { DynamicForm } from "./DynamicForm";
import { FormEntry, FormData } from "../../../types";

export default {
  title: "DynamicForm/DynamicForm",
  component: DynamicForm,
  parameters: {
    componentSubtitle: "Dynamic form component with custom templates and file attachments.",
  },
};

const mockFormData: FormData = {
  formData: {
    name: "John Doe",
    age: 30,
  },
};

const mockFormEntry: FormEntry = {
  fileName: "document.pdf",
  data: mockFormData,
  ownership: {
    beneficiaryAddress: "",
    holderAddress: "",
  },
  remarks: "This is a test document",
  extension: ".pdf",
};

export const Default: FunctionComponent = () => {
  const setFormData = (data: any) => {
    console.log("Form data updated:", data);
  };

  const setCurrentForm = (params: any) => {
    console.log("Current form updated:", params);
  };

  return (
    <DynamicForm
      schema={{
        type: "object",
        properties: {
          name: { type: "string", title: "Name" },
          age: { type: "number", title: "Age" },
        },
      }}
      form={mockFormEntry}
      setFormData={setFormData}
      setCurrentForm={setCurrentForm}
      attachmentAccepted={true}
      fileName={mockFormEntry.fileName}
    />
  );
};
