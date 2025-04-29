import React, { FunctionComponent } from "react";
import { useOverlayContext } from "../../../common/contexts/OverlayContext";
import { Overlay } from "./Overlay";
import { Button } from "@tradetrust-tt/tradetrust-ui-components";

export interface OverlayDemoProps {
  buttonText: string;
  children: React.ReactNode;
}

export const OverlayDemo: FunctionComponent<OverlayDemoProps> = ({ buttonText, children }) => {
  const { showOverlay } = useOverlayContext();

  return (
    <>
      <Overlay />
      <Button onClick={() => showOverlay(children)}>{buttonText}</Button>
    </>
  );
};
