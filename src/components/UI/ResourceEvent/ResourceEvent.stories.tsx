import React from "react";
import { ResourceEvent, EventProps } from "./ResourceEvent";

const mockEventMedia: EventProps = {
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
  return <ResourceEvent attributes={mockEventMedia.attributes} />;
};
