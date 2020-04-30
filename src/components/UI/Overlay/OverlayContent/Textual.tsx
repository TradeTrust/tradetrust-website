import React from "react";
import { OverlayContentBaseStyle } from "../Overlay";
import { OverlayContent, OverlayContentProps } from "./index";
import styled from "@emotion/styled";

export const Textual = styled(({ children, ...props }: OverlayContentProps) => {
  return <OverlayContent {...props}>{children}</OverlayContent>;
})`
  ${OverlayContentBaseStyle()}
`;
