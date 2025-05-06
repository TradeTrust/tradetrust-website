import { FunctionComponent } from "react";
import { AjvErrorMessage } from "./AjvErrorMessage";
import React from "react";

const mockError = {
  instancePath: "",
  schemaPath: "#/additionalProperties",
  keyword: "additionalProperties",
  params: {
    additionalProperty: "supplyChainConsignment",
  },
  message: "must NOT have additional properties",
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
