import React, { createContext, useContext, useState, useEffect } from "react";
import { useKeyPress } from "./../../common/hooks/useKeyPress";

interface OverlayContextProps {
  overlayContent: React.ReactNode;
  showOverlay: (overlayContent: React.ReactNode) => void;
  isOverlayVisible: boolean;
  setOverlayVisible: (isOverlayVisible: boolean) => void;
}

export const OverlayContext = createContext<OverlayContextProps>({
  overlayContent: undefined,
  showOverlay: () => {},
  isOverlayVisible: false,
  setOverlayVisible: () => {},
});

export const OverlayContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [overlayContent, setOverlayContent] = useState<OverlayContextProps["overlayContent"]>();
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  const escapePress = useKeyPress("Escape");

  useEffect(() => {
    if (escapePress) {
      setOverlayVisible(false);
    }
  }, [escapePress, setOverlayVisible]);

  useEffect(() => {
    // Using useEffect because we need setOverlayVisible to run AFTER setOverlayContent
    // If we simply have a function, the behaviour is not deterministic
    if (overlayContent !== undefined) {
      setOverlayVisible(true);
    }
  }, [overlayContent, setOverlayVisible]);

  return (
    <OverlayContext.Provider
      value={{
        overlayContent,
        showOverlay: setOverlayContent,
        isOverlayVisible,
        setOverlayVisible,
      }}
    >
      {children}
    </OverlayContext.Provider>
  );
};

export const useOverlayContext = (): OverlayContextProps => useContext<OverlayContextProps>(OverlayContext);
