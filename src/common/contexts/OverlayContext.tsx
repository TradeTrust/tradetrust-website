import React from "react";

interface OverlayProps {
  overlayContent: React.ReactNode;
  setOverlayContent: (overlayContent: React.ReactNode) => void;
  isOverlayVisible: boolean;
  setOverlayVisible: (isOverlayVisible: boolean) => void;
}

export const OverlayContext = React.createContext({} as OverlayProps);

export const OverlayProvider = OverlayContext.Provider;
export const OverlayConsumer = OverlayContext.Consumer;
