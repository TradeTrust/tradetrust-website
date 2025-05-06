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
        instancePath: "/credentialSubject/name",
        keyword: "type",
        message: "must be string",
        params: { type: "string" },
        schemaPath: "#/properties/credentialSubject/properties/name/type",
      },
      {
        instancePath: "/issuer",
        keyword: "required",
        message: "must have required property 'issuer'",
        params: { missingProperty: "issuer" },
        schemaPath: "#/required",
      },
    ]}
  />
);
