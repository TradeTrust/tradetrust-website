import { LinkButton } from "@govtechsg/tradetrust-ui-components";
import { isFuture, format } from "date-fns";
import React, { FunctionComponent } from "react";
import { ExternalLink, PlayCircle } from "react-feather";
import { formatTime } from "../../../common/utils/dateTime";

export interface EventProps {
  attributes: {
    title: string;
    thumbnail?: string;
    blurb: string;
    link: string;
    date: string;
    timeStart: string;
    timeEnd: string;
    videoLink?: string;
    slides?: string;
    registerLink?: string;
  };
}

export const ResourceEvent: FunctionComponent<EventProps> = ({ attributes }) => {
  const { title, thumbnail, blurb, link, date, timeStart, timeEnd, videoLink, slides, registerLink } = attributes;

  return (
    <div className="flex flex-wrap rounded-xl shadow-xl mb-4">
      {thumbnail && (
        <img className="object-cover rounded-t-xl md:w-4/12 md:rounded-none md:rounded-l-xl" src={thumbnail} />
      )}
      <div
        className={`w-full bg-white px-5 pt-3 pb-5 ${
          thumbnail ? "rounded-b-xl md:w-8/12 md:rounded-none md:rounded-r-xl" : "rounded-xl"
        }`}
      >
        <h4 className="title mb-2">
          <span className="font-ubuntu font-bold text-cloud-900 text-2xl">{title}</span>
        </h4>
        <div className="text-cloud-300 text-base font-medium pb-3">
          <span>{format(new Date(date), "d MMM yyyy")}</span>
          {timeStart && timeEnd && (
            <>
              <span className="mx-1">|</span>
              <span>
                {formatTime(timeStart, "HH:mm")} to {formatTime(timeEnd, "HH:mm")} ({formatTime(timeStart, "zzz")})
              </span>
            </>
          )}
        </div>
        <p className="text-cloud-900 font-normal mb-4">{blurb}</p>
        {isFuture(new Date(date)) && registerLink && (
          <LinkButton
            href={registerLink}
            target="_blank"
            className="bg-cerulean-200 rounded-xl text-white hover:bg-cerulean-300 hover:text-white inline-block mb-2"
          >
            Register
          </LinkButton>
        )}
        <div className="flex flex-wrap pt-4">
          {videoLink && (
            <div className="w-full sm:w-auto mb-2 sm:mb-0">
              <a
                className="text-lg text-cerulean-200 font-medium hover:text-cerulean-300 inline-block pr-4"
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
          <div className="w-full sm:w-auto mb-2 sm:mb-0">
            <a
              className="text-lg text-cerulean-200 font-medium hover:text-cerulean-300 inline-block pr-4"
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

          {slides && (
            <div className="w-full sm:w-auto mb-2 sm:mb-0">
              <a
                className="text-lg text-cerulean-200 font-medium hover:text-cerulean-300 inline-block pr-4"
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
    </div>
  );
};
