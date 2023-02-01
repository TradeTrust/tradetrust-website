import React, { FunctionComponent, useContext } from "react";
import { OverlayContext } from "@govtechsg/tradetrust-ui-components";

interface ButtonVideoProps {
  className?: string;
  children: React.ReactElement;
}

export const ButtonVideo: FunctionComponent<ButtonVideoProps> = ({ className, children }) => {
  const { showOverlay } = useContext(OverlayContext);
  const onOverlayHandler = () => {
    showOverlay(children);
  };

  return (
    <button
      className={`h-12 w-12 transition duration-300 ease-out rounded-full cursor-pointer bg-tangerine-500 hover:bg-tangerine-800 flex items-center justify-center ${className}`}
      onClick={onOverlayHandler}
      aria-label="play-video-button"
      data-testid="play-button"
    >
      <i className="fas fa-play text-white" />
    </button>
  );
};
