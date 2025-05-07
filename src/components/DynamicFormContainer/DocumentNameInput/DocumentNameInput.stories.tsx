import React, { FunctionComponent, useState } from "react";
import { DocumentNameInput } from "./DocumentNameInput";

export default {
  title: "DynamicForm/DocumentNameInput",
  component: DocumentNameInput,
  parameters: {
    componentSubtitle: "A simple input field to set the document name.",
  },
};

export const Default: FunctionComponent = () => {
  const [name, setName] = useState("");

  return (
    <div className="p-4 max-w-md">
      <DocumentNameInput value={name} onChange={(e) => setName(e.target.value)} />
      <p className="mt-2 text-sm text-gray-500">Typed Value: {name}</p>
    </div>
  );
};
