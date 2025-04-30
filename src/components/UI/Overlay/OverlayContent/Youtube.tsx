import React, { FunctionComponent } from "react";
import { OverlayContent, OverlayContentProps } from "./index";

interface YoutubeProps extends OverlayContentProps {
  youtubeId: string;
}

export const Youtube: FunctionComponent<YoutubeProps> = ({ youtubeId, ...props }) => {
  return (
    <OverlayContent className="max-w-6xl bg-white" {...props}>
      <div className="relative aspect-video">
        <iframe
          className="absolute top-0 left-0 w-full h-full p-0 m-0 border-0"
          title={youtubeId}
          src={`https://www.youtube.com/embed/${youtubeId}?rel=0`}
        />
      </div>
    </OverlayContent>
  );
};
