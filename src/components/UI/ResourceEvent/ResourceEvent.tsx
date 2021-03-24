import { LinkButton } from "@govtechsg/tradetrust-ui-components";
import { isFuture } from "date-fns";
import React, { FunctionComponent } from "react";
import { ExternalLink, PlayCircle } from "react-feather";
import { formatTime } from "../../../common/utils/dateTime";

export interface EventProps {
  attributes: {
    title: string;
    description: string;
    link: string;
    date: string;
    timeStart: string;
    timeEnd: string;
    videoLink: string;
    slides: string;
    registerLink: string;
  };
}

export const ResourceEvent: FunctionComponent<EventProps> = ({ attributes }) => {
  const { title, description, link, date, timeStart, timeEnd, videoLink, slides, registerLink } = attributes;

  return (
    <div className="bg-white shadow-md mb-4 w-full px-5 pt-3 pb-5">
      {isFuture(new Date(date)) && (
        <div className="border-2 border-orange rounded inline-block py-1 px-2 uppercase font-bold text-xs text-orange my-2">
          Upcoming
        </div>
      )}
      <h4 className="title mb-2">
        <span className="text-grey-700 font-medium text-2xl">{title}</span>
      </h4>
      <div className="text-grey text-base font-medium pb-3">
        <span>{date}</span>
        {timeStart && timeEnd && (
          <>
            <span className="mx-1">|</span>
            <span>
              {formatTime(timeStart, "HH:mm")} to {formatTime(timeEnd, "HH:mm")} ({formatTime(timeStart, "zzz")})
            </span>
          </>
        )}
      </div>
      <p className="mb-4">{description}</p>
      {registerLink && (
        <LinkButton
          href={registerLink}
          target="_blank"
          className="bg-orange text-white hover:bg-orange-600 hover:text-white inline-block mb-2"
        >
          Register
        </LinkButton>
      )}
      <div className="flex flex-wrap pt-4 text-blue">
        <div className="w-full sm:w-auto mb-2 sm:mb-0">
          <a
            className="text-lg font-medium inline-block pr-4"
            href={link}
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
        {videoLink && (
          <div className="w-full sm:w-auto mb-2 sm:mb-0">
            <a
              className="text-lg font-medium inline-block pr-4"
              href={videoLink}
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
        {slides && (
          <div className="w-full sm:w-auto mb-2 sm:mb-0">
            <a
              className="text-lg font-medium inline-block pr-4"
              href={slides}
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
