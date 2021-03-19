import React, { FunctionComponent } from "react";
import { ExternalLink, PlayCircle } from "react-feather";

export type EventMedia = {
  date: string;
  time?: string;
  eventLink: string;
  eventSlides?: string;
  watchLink?: string;
};

export interface ResourceEventProps {
  title: string;
  description: string;
  resource: EventMedia;
}

export const ResourceEvent: FunctionComponent<ResourceEventProps> = ({ title, description, resource }) => {
  const { date, time, eventLink, eventSlides, watchLink } = resource;

  return (
    <div className="bg-white shadow-md mb-4 w-full px-5 pt-3 pb-5">
      <h4 className="title mb-2">
        <span className="text-grey-700 font-medium text-2xl">{title}</span>
      </h4>
      <div className="text-grey text-base font-medium pb-3">
        <span className="mr-1">{date}</span>
        {time && (
          <>
            <span className="mx-1">|</span>
            <span>{time}</span>
          </>
        )}
      </div>
      <p className="mb-4">{description}</p>
      <div className="flex flex-wrap pt-4 text-blue">
        <div className="w-full sm:w-auto mb-2 sm:mb-0">
          <a
            className="text-lg font-medium inline-block pr-4"
            href={eventLink}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="event-link"
          >
            <div className="flex">
              <div className="w-auto">
                <ExternalLink />
              </div>
              <div className="flex-grow px-2">Event Link</div>
            </div>
          </a>
        </div>
        {watchLink && (
          <div className="w-full sm:w-auto mb-2 sm:mb-0">
            <a
              className="text-lg font-medium inline-block pr-4"
              href={watchLink}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="watch-link"
            >
              <div className="flex">
                <div className="w-auto">
                  <PlayCircle />
                </div>
                <div className="flex-grow px-2">Watch Event</div>
              </div>
            </a>
          </div>
        )}
        {eventSlides && (
          <div className="w-full sm:w-auto mb-2 sm:mb-0">
            <a
              className="text-lg font-medium inline-block pr-4"
              href={eventSlides}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="event-slides"
            >
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
    </div>
  );
};
