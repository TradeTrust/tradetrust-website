import React, { createContext, useContext, useState, useEffect } from "react";
import { useKeyPress } from "./../../common/hooks/useKeyPress";

interface OverlayContextProps {
  overlayContent: React.ReactNode;
  setOverlayContent: any; // (overlayContent: React.ReactNode) => void;
  isOverlayVisible: boolean;
  setOverlayVisible: (isOverlayVisible: boolean) => void;
}

export const OverlayContext = createContext<OverlayContextProps>({
  overlayContent: undefined,
  setOverlayContent: () => {},
  isOverlayVisible: false,
  setOverlayVisible: () => {},
});

export const OverlayContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [overlayContent, setOverlayContent] = useState(undefined);
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  const escapePress = useKeyPress("Escape");

  const overlayStore = {
    overlayContent,
    setOverlayContent,
    isOverlayVisible,
    setOverlayVisible,
  };

  useEffect(() => {
    if (escapePress) {
      setOverlayVisible(false);
    }
  }, [escapePress, setOverlayVisible]);

  useEffect(() => {
    if (overlayContent !== undefined) {
      setOverlayVisible(true);
    }
  }, [overlayContent, setOverlayVisible]);

  return <OverlayContext.Provider value={overlayStore}>{children}</OverlayContext.Provider>;
};

export const useOverlayContext = (): OverlayContextProps => useContext<OverlayContextProps>(OverlayContext);
