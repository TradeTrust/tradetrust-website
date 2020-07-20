import React from "react";
import styled from "@emotion/styled";
import { mixin, vars } from "./../../../styles";

interface MediaCardProps {
  className?: string;
  title: string;
  youtubeEmbedCode?: string;
  children?: React.ReactNode;
}

export const MediaCardUnStyled = ({ className, title, youtubeEmbedCode, children }: MediaCardProps) => {
  return (
    <div className={`${className}`}>
      {youtubeEmbedCode && (
        <div className="media">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeEmbedCode}?rel=0`}
            title={title}
            frameBorder="0"
            allowFullScreen
          />
        </div>
      )}
      <div className="content">
        <h3 className="title">{title}</h3>
        {children}
      </div>
    </div>
  );
};

export const MediaCard = styled(MediaCardUnStyled)`
  .media {
    ${mixin.aspectRatio(16, 9)};
  }

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .title {
    ${mixin.fontSourcesansproRegular};
    color: ${vars.blue};
  }

  .content {
    background-color: ${vars.white};
    padding: 20px;
  }

  ul {
    padding-left: 18px;
  }

  li {
    p {
      margin-bottom: 0;
    }
  }
`;
