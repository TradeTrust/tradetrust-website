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
              <div className="flex justify-center items-center h-full">
                <h5 className="mb-0">{placeholderText}</h5>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="content">
        <h4 className="title mb-2">
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
        </h4>
        {tag && <div className="tag">{tag}</div>}
        {dateTime && <div className="datetime">{dateTime}</div>}
        <p className="mb-4">{description}</p>
        {downloads && (
          <div className="py-2 text-brand-blue">
            {downloads?.map((download, index) => (
              <a
                className="font-bold flex items-start mt-1"
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
        )}
        {(watchLink || eventLink || eventSlides) && (
          <div className="flex flex-wrap pt-4 text-brand-blue">
            {watchLink && (
              <div className="w-full sm:w-auto mb-2 sm:mb-0">
                <a className="link" href={watchLink} target="_blank" rel="noopener noreferrer">
                  <div className="flex">
                    <div className="w-auto">
                      <PlayCircle />
                    </div>
                    <div className="flex-grow px-2">Watch Event</div>
                  </div>
                </a>
              </div>
            )}
            {eventLink && (
              <div className="w-full sm:w-auto mb-2 sm:mb-0">
                <a className="link" href={eventLink} target="_blank" rel="noopener noreferrer">
                  <div className="flex">
                    <div className="w-auto">
                      <ExternalLink />
                    </div>
                    <div className="flex-grow px-2">Event Link</div>
                  </div>
                </a>
              </div>
            )}
            {eventSlides && (
              <div className="w-full sm:w-auto mb-2 sm:mb-0">
                <a className="link" href={eventSlides} target="_blank" rel="noopener noreferrer">
                  <div className="flex">
                    <div className="w-auto">
                      <ExternalLink />
                    </div>
                    <div className="flex-grow px-2">Event Slides</div>
                  </div>
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </ResourcesCardItem>
  );
};

const ResourcesCardItem = styled.div`
  background-color: ${vars.white};
  display: flex;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 1rem;

  @media (max-width: ${vars.lg}) {
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
    display: inline-block;
    padding-right: 16;
  }

  .datetime {
    color: ${vars.grey};
    ${mixin.fontSize(16)};
    ${mixin.fontSourcesansproSemibold};
    padding-bottom: 12;
  }
`;
