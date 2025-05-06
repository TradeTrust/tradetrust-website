import React, { FunctionComponent } from "react";
import { DynamicFormHeader } from "./DynamicFormHeader";

export default {
  title: "DynamicForm/DynamicFormHeader",
  component: DynamicFormHeader,
  parameters: {
    componentSubtitle: "Header component for dynamic form with navigation and error display.",
  },
};

export const Default: FunctionComponent = () => (
  <DynamicFormHeader
    onBackToFormSelection={() => alert("Back to form selection")}
    onFormSubmit={() => alert("Form submitted")}
    formErrorTitle="There are some issues with the form submission."
    formErrors={[
      {
        instancePath: "/credentialSubject/email",
        keyword: "format",
        message: 'must match format "email"',
        params: { format: "email" },
        schemaPath: "#/properties/credentialSubject/properties/email/format",
      },
    ]}
  />
);
