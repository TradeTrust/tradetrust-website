import React from "react";
import { Input, InputDefault } from "./Input";

export default {
  title: "UI/Input",
  component: Input,
  parameters: {
    componentSubtitle: "Inputs, error state.",
  },
};

export const Default = () => {
  return <InputDefault type="text" name="test" placeholder="Placeholder" />;
};

export const Error = () => {
  return <InputDefault type="text" name="test" placeholder="Placeholder" errorMessage="Some error occurred." />;
};
