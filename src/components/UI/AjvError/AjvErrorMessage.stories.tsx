import { ValidationError, betterAjvErrors } from "@apideck/better-ajv-errors";
import type { Meta } from "@storybook/react";
import { JSONSchema6 } from "json-schema";
import React from "react";
import { AjvErrorMessage } from "./AjvErrorMessage";

const schema: JSONSchema6 = {
  type: "object",
  properties: {
    name: { type: "string" },
    age: { type: "number" },
    email: { type: "string", format: "email" },
  },
  required: ["name", "age", "email"],
  additionalProperties: false,
};

const invalidData = {
  name: "John",
  age: "25", // Invalid type: should be number
  email: "invalid-email", // Invalid email format
  extraField: "not allowed", // Additional property not allowed
};

const mockError: ValidationError[] = betterAjvErrors({
  errors: [
    {
      instancePath: "/age",
      schemaPath: "#/properties/age/type",
      keyword: "type",
      params: { type: "number" },
      message: "must be number",
    },
    {
      instancePath: "/email",
      schemaPath: "#/properties/email/format",
      keyword: "format",
      params: { format: "email" },
      message: 'must match format "email"',
    },
    {
      instancePath: "",
      schemaPath: "#/additionalProperties",
      keyword: "additionalProperties",
      params: { additionalProperty: "extraField" },
      message: "must NOT have additional properties",
    },
  ],
  data: invalidData,
  schema: schema,
});

export default {
  title: "UI/AjvErrorMessage",
  component: AjvErrorMessage,
  parameters: {
    componentSubtitle: "AjvErrorMessage",
  },
} as Meta<typeof AjvErrorMessage>;

export const Default = () => {
  return <AjvErrorMessage error={mockError[0]} />;
};

export const FormatError = () => {
  return <AjvErrorMessage error={mockError[1]} />;
};

export const AdditionalPropertyError = () => {
  return <AjvErrorMessage error={mockError[2]} />;
};
