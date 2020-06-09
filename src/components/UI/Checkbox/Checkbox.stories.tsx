import React from "react";
import { Checkbox, CheckboxDefault } from "./Checkbox";

export default {
  title: "UI/Checkbox",
  component: Checkbox,
  parameters: {
    componentSubtitle: "Checkboxes.",
  },
};

export const Default = () => {
  return <CheckboxDefault text="This is default checkbox." name="test" />;
};
