import React from "react";
import { ErrorText, Input, InputDefault, InputEditableAssetTitle } from "./Input";

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

export const InputDefaultError = () => {
  return <InputDefault type="text" name="test" placeholder="Placeholder" errorMessage="Some error occurred." />;
};

export const InputEditableAssetTitleDefault = () => {
  return <InputEditableAssetTitle />;
};
export const InputEditableAssetTitleError = () => {
  return <InputEditableAssetTitle hasError={true} />;
};

export const TextError = () => {
  return <ErrorText>Some Error Occurred</ErrorText>;
};
