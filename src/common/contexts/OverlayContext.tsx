import React, { createContext, FunctionComponent, useContext, useEffect, useState } from "react";
import { useKeyPress } from "../hooks/useKeyPress";

export interface OverlayContextProps {
  overlayContent: React.ReactNode;
  showOverlay: (overlayContent: React.ReactNode) => void;
  closeOverlay: () => void;
  isOverlayVisible: boolean;
  setOverlayVisible: (isOverlayVisible: boolean) => void;
  collapsible?: boolean;
  setCollapsible: (collapsible: boolean) => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

export const OverlayContext = createContext<OverlayContextProps>({
  overlayContent: undefined,
  showOverlay: noop,
  closeOverlay: noop,
  isOverlayVisible: false,
  setOverlayVisible: noop,
  collapsible: false,
  setCollapsible: noop,
});

export const OverlayContextProvider: FunctionComponent = ({ children }) => {
  const [overlayContent, setOverlayContent] = useState<OverlayContextProps["overlayContent"]>();
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [collapsible, setCollapsible] = useState(false);

  const escapePress = useKeyPress("Escape");

  const handleCloseOverlay = (): void => {
    setOverlayVisible(false);
    setOverlayContent(undefined);
  };

  useEffect(() => {
    if (escapePress && collapsible) {
      setOverlayVisible(false);
    }
  }, [escapePress, collapsible, setOverlayVisible]);

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
        closeOverlay: handleCloseOverlay,
        isOverlayVisible,
        setOverlayVisible,
        collapsible,
        setCollapsible,
      }}
    >
      {children}
    </OverlayContext.Provider>
  );
};

export interface useOverlayContextProps {
  collapsible?: boolean;
}

/**
 * @param props {useOverlayContextProps} Props to pass to context
 * @param props.collapsible {boolean} Whether the overlay is collapsible. To be used when declaring inside the overlay component. Should not be declared when using useOverlayContext. Default: true
 * @returns The overlay context
 */
export const useOverlayContext = (props?: useOverlayContextProps): OverlayContextProps => {
  const context = useContext(OverlayContext);
  const { collapsible } = props ?? {};

  useEffect(() => {
    // Only update collapsible if it's defined
    if (typeof collapsible !== "undefined") {
      context.setCollapsible(collapsible);
    }
  }, [collapsible, context]);

  return context;
};
