import React, { FunctionComponent } from "react";
import { FormErrorBanner } from "./FormErrorBanner";

export default {
  title: "DynamicForm/FormErrorBanner",
  component: FormErrorBanner,
  parameters: {
    componentSubtitle: "Displays form validation errors using AJV.",
  },
};

export const Default: FunctionComponent = () => (
  <FormErrorBanner
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
