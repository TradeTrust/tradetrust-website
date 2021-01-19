import styled from "@emotion/styled";
import { Dropdown, DropdownItem } from "@govtechsg/tradetrust-ui-components";
import React, { FunctionComponent, useState } from "react";
import { Download, ExternalLink, PlayCircle } from "react-feather";
import tw from "twin.macro";
import { mixin } from "./../../../styles";

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
    videoTimeStamps?: {
      title: string;
      timeStamp: number;
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
    videoTimeStamps,
  } = details;
  const hasMedia = placeholderText || youtubeEmbedCode;
  const [currentTimeStamp, setCurrentTimeStamp] = useState(0);

  const convertSecondsToMinAndSec = (seconds: number): string => {
    return `${~~(seconds / 60)}:${seconds % 60}m`;
  };

  return (
    <ResourcesCardItem>
      {hasMedia && (
        <div className="media-holder">
          {youtubeEmbedCode ? (
            <iframe
              src={`https://www.youtube.com/embed/${youtubeEmbedCode}${
                currentTimeStamp ? `?autoplay=1&rel=0&start=${currentTimeStamp}` : "?rel=0"
              }`}
              title={title}
              frameBorder="0"
              allow="autoplay; fullscreen"
              data-testid="youtubeEmbed-iframe"
            />
          ) : (
            <div
              className="absolute top-0 left-0 w-full h-full bg-grey-200 p-4 text-center pointer-events-none"
              data-testid="placeholder"
            >
              <div className="flex justify-center items-center h-full">
                <h5 className="mb-0 text-grey font-normal">{placeholderText}</h5>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="w-full px-5 pt-3 pb-5">
        <h4 className="title mb-2">
          {youtubeEmbedCode ? (
            <a
              className="text-grey-700 font-medium text-2xl"
              href={`https://www.youtube.com/watch?v=${youtubeEmbedCode}`}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="youtubeEmbed-title-link"
            >
              {title}
            </a>
          ) : (
            <span className="text-grey-700 font-medium text-2xl" data-testid="placeholder-title">
              {title}
            </span>
          )}
        </h4>
        {tag && (
          <div className="inline-block border border-solid border-grey text-grey w-auto text-sm rounded font-medium p-1 mb-4">
            {tag}
          </div>
        )}
        {dateTime && <div className="text-grey text-base font-medium pb-3">{dateTime}</div>}
        <p className="mb-4">{description}</p>
        {youtubeEmbedCode && videoTimeStamps && (
          <Dropdown
            data-testid="quickVideoLinksDropdown"
            dropdownButtonText="Quick Video Links"
            className="rounded border border-grey-300 text-grey-700 p-2 mb-2"
          >
            {videoTimeStamps.map((eachTimeStamp, i) => {
              return (
                <DropdownItem
                  key={i}
                  data-testid="videoTimeStampsDropdown"
                  onClick={() => setCurrentTimeStamp(eachTimeStamp.timeStamp)}
                >
                  {eachTimeStamp.title} [{convertSecondsToMinAndSec(eachTimeStamp.timeStamp)}]
                </DropdownItem>
              );
            })}
          </Dropdown>
        )}
        {downloads && (
          <div className="py-2 text-blue">
            {downloads?.map((download, index) => (
              <a
                className="font-semibold flex items-start mt-1"
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
          <div className="flex flex-wrap pt-4 text-blue">
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
  ${tw`bg-white flex flex-col lg:flex-row shadow-md mb-4`}

  .media-holder {
    ${mixin.aspectRatio(16, 9)};
  }

  iframe {
    ${tw`absolute top-0 left-0 w-full h-full`}
  }

  .link {
    ${tw`text-lg font-medium inline-block pr-4`}
  }
`;
