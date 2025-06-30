import React, { ReactElement } from "react";
import { Input } from "./Input";

export default {
  title: "UI/Input",
  component: Input,
  parameters: {
    componentSubtitle: "Inputs, error state.",
  },
};

export const Default = (): ReactElement => {
  return <Input type="text" placeholder="Placeholder" hasError={false} />;
};

export const ErrorNoMessage = (): ReactElement => {
  return <Input type="text" placeholder="Placeholder" hasError={true} />;
};

export const ErrorWithMessage = (): ReactElement => {
  return <Input type="text" placeholder="Placeholder" hasError={true} errorMessage="Some error occurred." />;
};
