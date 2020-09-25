import styled from "@emotion/styled";
import React, { FunctionComponent } from "react";
import { Download } from "react-feather";
import { mixin, vars } from "./../../../styles";

interface ResourcesCardProps {
  className?: string;
  details: {
    title: string;
    youtubeEmbedCode?: string;
    placeholderText?: string;
    tag: string;
    description: string;
    downloads: {
      fileName: string;
      path: string;
    }[];
  };
}

const ResourcesCardUnStyled: FunctionComponent<ResourcesCardProps> = ({ className, details }) => {
  const { placeholderText, youtubeEmbedCode, title, tag, description, downloads } = details;
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
            <a
              className="title"
              href={`https://www.youtube.com/watch?v=${youtubeEmbedCode}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {title}
            </a>
          ) : (
            <span>{title}</span>
          )}
        </h3>
        {tag && <div className="tag">{tag}</div>}
        <p>{description}</p>
        <div className="py-2">
          {downloads.map((download) => (
            <a
              className="font-weight-bold d-flex align-items-end mt-1"
              href={download.path}
              download={download.fileName}
            >
              <Download />
              <span className="ml-2">{download.fileName}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ResourcesCard = styled(ResourcesCardUnStyled)`
  background-color: ${vars.white};
  display: flex;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }

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
    ${mixin.fontSourcesansproSemibold};
    color: ${vars.greyDark};
  }

  .content {
    padding: 20px;
    padding-top: 12px;
    width: 100%;
  }

  ul {
    padding-left: 18px;
  }

  li {
    p {
      margin-bottom: 0;
    }
  }

  .tag {
    border: 1px solid ${vars.greyDark};
    width: auto;
    ${mixin.fontSize(13)};
    border-radius: 3px;
    ${mixin.fontSourcesansproSemibold};
    padding: 4px;
    margin-bottom: 1rem;
    display: inline-block;
  }
`;
