import React, { FunctionComponent } from "react";
import { DataFileButton } from "./DataFileButton";
import { JsonSchema } from "json-schema-library";

export default {
  title: "DynamicForm/DataFileButton",
  component: DataFileButton,
  parameters: {
    componentSubtitle: "Allows uploading a JSON or CSV data file to pre-fill form fields.",
  },
};

const mockSchema: JsonSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    email: { type: "string", format: "email" },
  },
  required: ["name", "email"],
};

export const Default: FunctionComponent = () => (
  <div className="p-4 max-w-xl">
    <DataFileButton onDataFile={(dataFile) => console.log("Data file uploaded:", dataFile)} schema={mockSchema} />
  </div>
);
