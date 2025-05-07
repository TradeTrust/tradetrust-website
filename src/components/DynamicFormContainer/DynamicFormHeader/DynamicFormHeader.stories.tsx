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
        message: "Form must have required property 'issuer'",
        path: ".issuer",
        context: {
          errorType: "required",
          missingProperty: "issuer",
        },
      },
      {
        message: "'supplyChainConsignment' property is not expected to be here",
        path: ".supplyChainConsignment",
        context: {
          errorType: "additionalProperties",
          additionalProperty: "supplyChainConsignment",
        },
      },
    ]}
  />
);
