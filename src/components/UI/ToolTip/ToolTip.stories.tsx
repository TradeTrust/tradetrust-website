import React, { ReactElement } from "react";
import { ToolTip } from "./ToolTip";

export default {
  title: "UI/ToolTip",
  component: ToolTip,
  parameters: {
    componentSubtitle: "Custom more Info icon component",
  },
};

export const Default = (): ReactElement => {
  return (
    <div className="mt-20">
      <ToolTip toolTipText="testing testing testing testing testing testing testing testing testing testing testing" />
    </div>
  );
};
