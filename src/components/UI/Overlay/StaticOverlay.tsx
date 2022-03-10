import { Button, Overlay, OverlayContext } from "@govtechsg/tradetrust-ui-components";
import React from "react";
import { FunctionComponent, useContext } from "react";

export interface StaticOverlayProps {
  buttonText: string;
  className?: string;
  style?: Record<string, string | number>;
  children: React.ReactNode;
}

export const StaticOverlay: FunctionComponent<StaticOverlayProps> = ({ buttonText, className, style, children }) => {
  const { showOverlay } = useContext(OverlayContext);

  return (
    <>
      <Overlay />
      <Button className={className} style={style} onClick={() => showOverlay(children)}>
        {buttonText}
      </Button>
    </>
  );
};
