import React from "react";
import { OverlayContent, OverlayContentProps } from "./index";

export const Textual: React.FunctionComponent<OverlayContentProps> = ({ children, ...props }) => {
  return (
    <OverlayContent className="max-w-6xl bg-white" {...props}>
      {children}
    </OverlayContent>
  );
};
