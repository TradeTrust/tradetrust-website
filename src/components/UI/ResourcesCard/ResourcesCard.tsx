import styled from "@emotion/styled";
import React, { FunctionComponent } from "react";
import { Download, ExternalLink, PlayCircle } from "react-feather";
import { mixin, vars } from "./../../../styles";

interface ResourcesCardProps {
  details: {
    title: string;
    youtubeEmbedCode?: string;
    placeholderText?: string;
    tag?: string;
    description: string;
    dateTime?: string;
    eventSlides?: string;
    eventLink?: string;
    watchLink?: string;
    downloads?: {
      fileName: string;
      path: string;
    }[];
  };
}

export const ResourcesCard: FunctionComponent<ResourcesCardProps> = ({ details }) => {
  const {
    placeholderText,
    youtubeEmbedCode,
    title,
    tag,
    description,
    downloads,
    dateTime,
    watchLink,
    eventLink,
    eventSlides,
  } = details;
  const hasMedia = placeholderText || youtubeEmbedCode;

  return (
    <ResourcesCardItem>
      {hasMedia && (
        <div className="media-holder">
          {youtubeEmbedCode ? (
            <iframe
              src={`https://www.youtube.com/embed/${youtubeEmbedCode}?rel=0`}
              title={title}
              frameBorder="0"
              allowFullScreen
              data-testid="youtubeEmbed-iframe"
            />
          ) : (
            <div className="placehold" data-testid="placeholder">
              <div className="d-flex justify-content-center align-items-center h-100">
                <h5 className="flex mb-0">{placeholderText}</h5>
              </div>
            </div>
          )}
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
              data-testid="youtubeEmbed-title-link"
            >
              {title}
            </a>
          ) : (
            <span data-testid="placeholder-title">{title}</span>
          )}
        </h3>
        {tag && <div className="tag">{tag}</div>}
        {dateTime && <div className="datetime">{dateTime}</div>}
        <p>{description}</p>
        <div className="py-2">
          {downloads?.map((download, index) => (
            <a
              className="font-weight-bold d-flex align-items-end mt-1"
              href={download.path}
              download={download.fileName}
              key={index}
              data-testid="download-link"
            >
              <Download />
              <span className="ml-2">{download.fileName}</span>
            </a>
          ))}
        </div>
        <div className="row no-gutters">
          {watchLink && (
            <div className="col-12 col-sm-auto">
              <a className="link" href={watchLink} target="_blank" rel="noopener noreferrer">
                <PlayCircle />
                <span className="px-2">Watch Event</span>
              </a>
            </div>
          )}
          {eventLink && (
            <div className="col-12 col-sm-auto">
              <a className="link" href={eventLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink />
                <span className="px-2">Event Link</span>
              </a>
            </div>
          )}
          {eventSlides && (
            <div className="col-12 col-sm-auto">
              <a className="link" href={eventSlides} target="_blank" rel="noopener noreferrer">
                <ExternalLink />
                <span className="px-2">Event Slides</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </ResourcesCardItem>
  );
};

const ResourcesCardItem = styled.div`
  background-color: ${vars.white};
  display: flex;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 1rem;

  @media (max-width: ${vars.md}) {
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

  .link {
    ${mixin.fontSize(18)};
    ${mixin.fontSourcesansproSemibold};
    display: inline;
    padding-right: 16;
  }

  .datetime {
    color: ${vars.grey};
    ${mixin.fontSize(16)};
    ${mixin.fontSourcesansproSemibold};
    padding-bottom: 12;
  }
`;
