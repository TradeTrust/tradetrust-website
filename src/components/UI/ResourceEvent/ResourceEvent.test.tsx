import { render, screen } from "@testing-library/react";
import React from "react";
import { ResourceEvent, EventMedia } from "./ResourceEvent";

const mockEventMedia: EventMedia = {
  date: "2 July 2020",
  time: "9 - 10pm (SGT)",
  watchLink: "https://www.youtube.com/watch?v=iRmaQV9HERw",
  eventLink: "https://www.baft.org/baft-education/e-learning/past-webinars",
  eventSlides:
    "https://baft.org/docs/default-source/past-webinars/webinar-the-journey-to-paperless-trade.pdf?sfvrsn=6e9a20e1_2",
};

describe("ResourceEvent", () => {
  it("should render title correctly", () => {
    render(
      <ResourceEvent
        title="The Journey to Paperless Trade: Industry Initiatives for Interoperability"
        description=""
        resource={mockEventMedia}
      />
    );

    expect(
      screen.getByText("The Journey to Paperless Trade: Industry Initiatives for Interoperability")
    ).not.toBeNull();
  });

  it("should render date correctly", () => {
    render(<ResourceEvent title="" description="" resource={mockEventMedia} />);

    expect(screen.getByText("2 July 2020")).not.toBeNull();
  });

  it("should render time correctly", () => {
    render(<ResourceEvent title="" description="" resource={mockEventMedia} />);

    expect(screen.getByText("9 - 10pm (SGT)")).not.toBeNull();
  });

  it("should render event link correctly", () => {
    render(<ResourceEvent title="" description="" resource={mockEventMedia} />);

    expect(screen.getByTestId("event-link").getAttribute("href")).toContain("past-webinars");
  });

  it("should render watch link correctly", () => {
    render(<ResourceEvent title="" description="" resource={mockEventMedia} />);

    expect(screen.getByTestId("watch-link").getAttribute("href")).toContain("iRmaQV9HERw");
  });

  it("should render event slides correctly", () => {
    render(<ResourceEvent title="" description="" resource={mockEventMedia} />);

    expect(screen.getByTestId("event-slides").getAttribute("href")).toContain(
      "webinar-the-journey-to-paperless-trade.pdf?sfvrsn=6e9a20e1_2"
    );
  });
});
