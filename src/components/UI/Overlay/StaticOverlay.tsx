import { Overlay, OverlayContext } from "@govtechsg/tradetrust-ui-components";
import React from "react";
import { FunctionComponent, useContext } from "react";

export interface StaticOverlayProps {
  buttonText: string;
  className?: string;
  children: React.ReactNode;
}

export const StaticOverlay: FunctionComponent<StaticOverlayProps> = ({ buttonText, className, children }) => {
  const { showOverlay } = useContext(OverlayContext);

  return (
    <>
      <Overlay />
      <button className={className} onClick={() => showOverlay(children)}>
        {buttonText}
      </button>
    </>
  );
};
