import { Button } from "../../Button";
import React, { FunctionComponent, useEffect } from "react";
import { useOverlayContext } from "../../../common/contexts/OverlayContext";
import { Overlay } from "./Overlay";

export interface OverlayDemoProps {
  buttonText: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const OverlayDemo: FunctionComponent<OverlayDemoProps> = ({ buttonText, children, defaultOpen }) => {
  const { showOverlay } = useOverlayContext();

  useEffect(() => {
    if (defaultOpen) {
      showOverlay(children);
    }
  }, [defaultOpen, showOverlay, children]);

  return (
    <>
      <Overlay />
      <Button onClick={() => showOverlay(children)}>{buttonText}</Button>
    </>
  );
};
