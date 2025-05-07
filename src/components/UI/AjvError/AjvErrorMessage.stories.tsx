import { FunctionComponent } from "react";
import { AjvErrorMessage } from "./AjvErrorMessage";
import React from "react";
import { ValidationError } from "@apideck/better-ajv-errors";

const mockError: ValidationError = {
  message: "'supplyChainConsignment' property is not expected to be here",
  path: ".supplyChainConsignment",
  context: {
    errorType: "additionalProperties",
    additionalProperty: "supplyChainConsignment",
  },
};

export default {
  title: "UI/AjvErrorMessage",
  component: AjvErrorMessage,
  parameters: {
    componentSubtitle: "AjvErrorMessage",
  },
};

export const Default: FunctionComponent = () => {
  return <AjvErrorMessage error={mockError} />;
};
