import { render, screen } from "@testing-library/react";
import React from "react";
import { ResourceEvent, EventMedia } from "./ResourceEvent";

const mockEventMedia: EventMedia = {
  dateTime: "2 July | 9-10pm SGT",
  watchLink: "https://www.youtube.com/watch?v=iRmaQV9HERw",
  eventLink: "https://www.baft.org/baft-education/e-learning/past-webinars",
  eventSlides:
    "https://baft.org/docs/default-source/past-webinars/webinar-the-journey-to-paperless-trade.pdf?sfvrsn=6e9a20e1_2",
};

describe("ResourceCard", () => {
  it("should render title correctly", () => {
    render(<ResourceEvent title="TradeTrust Overview" description="" resource={mockEventMedia} />);

    expect(screen.queryAllByText("TradeTrust Overview")).toHaveLength(1);
  });
});
