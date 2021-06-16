import React from "react";
import { ResourceEvent, EventProps } from "./ResourceEvent";

const mockEventDefault: EventProps = {
  attributes: {
    title: "The Journey to Paperless Trade: Industry Initiatives for Interoperability",
    description:
      "This event by BAFT and R3 explored different blockchain-based digital trade solutions and how global trade participants can use these solutions towards challenges in the global trade ecosystem.",
    link: "https://www.baft.org/baft-education/e-learning/past-webinars",
    date: "2 Jul 2020",
    timeStart: "2021-03-19T13:00:00.000Z",
    timeEnd: "2021-03-19T14:00:00.000Z",
    videoLink: "https://www.youtube.com/watch?v=iRmaQV9HERw",
    slides: "/static/uploads/webinar-the-journey-to-paperless-trade.pdf",
    registerLink: "https://zoom.us/webinar/register/WN_9Z2Jg3INT0aYUC7SpY5q3g",
  },
};

const mockEventFuture: EventProps = {
  ...mockEventDefault,
  attributes: {
    ...mockEventDefault.attributes,
    date: "1 Jan 2100",
  },
};

const mockEventThumbnail: EventProps = {
  ...mockEventDefault,
  attributes: {
    ...mockEventDefault.attributes,
    thumbnail:
      "https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29uZmVyZW5jZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
  },
};

export default {
  title: "UI/ResourceEvent",
  component: ResourceEvent,
  parameters: {
    componentSubtitle: "ResourceEvent with details.",
  },
};

export const Default = () => {
  return <ResourceEvent attributes={mockEventDefault.attributes} />;
};

export const Future = () => {
  return <ResourceEvent attributes={mockEventFuture.attributes} />;
};

export const Thumbnail = () => {
  return <ResourceEvent attributes={mockEventThumbnail.attributes} />;
};
