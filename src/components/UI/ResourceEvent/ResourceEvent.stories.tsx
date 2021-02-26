import React from "react";
import { ResourceEvent, EventMedia } from "./ResourceEvent";

const mockEventMedia: EventMedia = {
  dateTime: "2 July | 9-10pm SGT",
  watchLink: "https://www.youtube.com/watch?v=iRmaQV9HERw",
  eventLink: "https://www.baft.org/baft-education/e-learning/past-webinars",
  eventSlides:
    "https://baft.org/docs/default-source/past-webinars/webinar-the-journey-to-paperless-trade.pdf?sfvrsn=6e9a20e1_2",
};

export default {
  title: "UI/ResourceEvent",
  component: ResourceEvent,
  parameters: {
    componentSubtitle: "ResourceEvent with details.",
  },
};

export const Default = () => {
  return (
    <ResourceEvent
      title="The Journey to Paperless Trade: Industry Initiatives for Interoperability"
      description="This event by BAFT and R3 explored different blockchain-based digital trade solutions and how global trade participants can use these solutions towards challenges in the global trade ecosystem."
      resource={mockEventMedia}
    />
  );
};
