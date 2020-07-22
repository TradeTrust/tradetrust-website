import React from "react";
import styled from "@emotion/styled";
import { mixin, vars } from "./../../../styles";

interface MediaCardProps {
  className?: string;
  title: string;
  placeholderText?: string;
  youtubeEmbedCode?: string;
  children?: React.ReactNode;
}

export const MediaCardUnStyled = ({
  className,
  title,
  placeholderText,
  youtubeEmbedCode,
  children,
}: MediaCardProps) => {
  const hasMedia = placeholderText || youtubeEmbedCode;

  return (
    <div className={`${className}`}>
      {hasMedia && (
        <div className="media-holder">
          {youtubeEmbedCode && (
            <iframe
              src={`https://www.youtube.com/embed/${youtubeEmbedCode}?rel=0`}
              title={title}
              frameBorder="0"
              allowFullScreen
            />
          )}
          <div className="placehold">
            <div className="d-flex justify-content-center align-items-center h-100">
              <h5 className="flex mb-0">{placeholderText}</h5>
            </div>
          </div>
        </div>
      )}
      <div className="content">
        <h3 className="title">
          {youtubeEmbedCode ? (
            <a href={`https://www.youtube.com/watch?v=${youtubeEmbedCode}`} target="_blank" rel="noopener noreferrer">
              {title}
            </a>
          ) : (
            <span>{title}</span>
          )}
        </h3>
        {children}
      </div>
    </div>
  );
};

export const MediaCard = styled(MediaCardUnStyled)`
  height: 100%;
  background-color: ${vars.white};

  .media-holder {
    ${mixin.aspectRatio(16, 9)};
  }

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .placehold {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    padding: 15px;
    text-align: center;
    pointer-events: none;

    h5 {
      ${mixin.fontSourcesansproRegular};
      color: rgba(0, 0, 0, 0.3);
    }
  }

  .title {
    ${mixin.fontSourcesansproRegular};
    color: ${vars.blue};
  }

  .content {
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
