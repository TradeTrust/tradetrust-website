import React from "react";
import { Checkbox } from "./Checkbox";

export default {
  title: "UI/Checkbox",
  component: Checkbox,
  parameters: {
    componentSubtitle: "Checkboxes.",
  },
};

export const Default = () => {
  return <Checkbox name="test">This is default checkbox.</Checkbox>;
};
