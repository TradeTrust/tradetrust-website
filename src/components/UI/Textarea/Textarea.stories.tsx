import React from "react";
import { TextareaDefault } from "./Textarea";

export default {
  title: "UI/Textarea",
  component: TextareaDefault,
};

export const Default = () => {
  return <TextareaDefault name="test" placeholder="Placeholder" />;
};
