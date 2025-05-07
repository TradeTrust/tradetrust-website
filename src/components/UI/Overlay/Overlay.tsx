import React, { FunctionComponent, useEffect } from "react";
import { useOverlayContext } from "../../../common/contexts/OverlayContext";

export const Overlay: FunctionComponent = () => {
  const { overlayContent, closeOverlay, isOverlayVisible, collapsible } = useOverlayContext();

  useEffect(() => {
    if (isOverlayVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOverlayVisible]);

  return (
    <>
      {isOverlayVisible && (
        <div className={`overlay fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center z-50`}>
          <div
            className="overlay-bg absolute top-0 left-0 w-full h-full bg-black bg-opacity-40"
            onClick={() => {
              if (collapsible) {
                closeOverlay();
              }
            }}
          />
          {overlayContent}
        </div>
      )}
    </>
  );
};
