import React from "react";
import { OverlayContentBaseStyle } from "./../Overlay";
import { OverlayContent, OverlayContentProps } from "./index";
import styled from "@emotion/styled";
import { mixin } from "../../../../styles";

interface YoutubeProps extends OverlayContentProps {
  youtubeId: string;
}

export const Youtube = styled(({ youtubeId, ...props }: YoutubeProps) => {
  return (
    <OverlayContent {...props}>
      <div className="video">
        <iframe title={youtubeId} src={`https://www.youtube.com/embed/${youtubeId}?rel=0`} />
      </div>
    </OverlayContent>
  );
})`
  ${OverlayContentBaseStyle()}
  height: auto;

  .video {
    ${mixin.aspectRatio(16, 9)}

    > iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding: 0;
      margin: 0;
      border: 0;
    }
  }
`;
