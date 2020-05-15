import React, { useContext } from "react";
import { OverlayContext } from "./../../../common/contexts/OverlayContext";
import { Overlay } from "./Overlay";
import { OverlayContextProvider } from "./../../../common/contexts/OverlayContext";
import { ButtonSolid } from "./../../UI/Button";

interface OverlayStorybookWrapperProps {
  children: React.ReactNode;
}

export const OverlayStorybookApplication = ({ children }: OverlayStorybookWrapperProps) => {
  const { showOverlay } = useContext(OverlayContext);
  return (
    <>
      <Overlay />
      <ButtonSolid onClick={() => showOverlay(children)}>Show Overlay</ButtonSolid>
    </>
  );
};

export const OverlayStorybookWrapper = ({ children }: OverlayStorybookWrapperProps) => {
  return (
    <OverlayContextProvider>
      <OverlayStorybookApplication>{children}</OverlayStorybookApplication>
    </OverlayContextProvider>
  );
};
