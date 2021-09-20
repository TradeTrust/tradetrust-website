import { render, screen } from "@testing-library/react";
import React from "react";
import { ResourceEvent, EventProps } from "./ResourceEvent";

const mockEventMedia: EventProps = {
  attributes: {
    title: "The Journey to Paperless Trade: Industry Initiatives for Interoperability",
    blurb:
      "This event by BAFT and R3 explored different blockchain-based digital trade solutions and how global trade participants can use these solutions towards challenges in the global trade ecosystem.",
    link: "https://www.baft.org/baft-education/e-learning/past-webinars",
    date: "2 Jul 2020",
    timeStart: "2021-03-19T13:00:00.000Z",
    timeEnd: "2021-03-19T14:00:00.000Z",
    videoLink: "https://www.youtube.com/watch?v=iRmaQV9HERw",
    slides: "/static/uploads/webinar-the-journey-to-paperless-trade.pdf",
  },
};

describe("ResourceEvent", () => {
  it("should render title correctly", () => {
    render(<ResourceEvent attributes={mockEventMedia.attributes} />);

    expect(
      screen.getByText("The Journey to Paperless Trade: Industry Initiatives for Interoperability")
    ).not.toBeNull();
  });

  it("should render date correctly", () => {
    render(<ResourceEvent attributes={mockEventMedia.attributes} />);

    expect(screen.getByText("2 Jul 2020")).not.toBeNull();
  });

  it("should render time correctly", () => {
    render(<ResourceEvent attributes={mockEventMedia.attributes} />);

    expect(screen.getByText("21:00 to 22:00 (GMT+8)")).not.toBeNull();
  });

  it("should render event link correctly", () => {
    render(<ResourceEvent attributes={mockEventMedia.attributes} />);

    expect(screen.getByTestId("event-link").getAttribute("href")).toContain("past-webinars");
  });

  it("should render watch link correctly", () => {
    render(<ResourceEvent attributes={mockEventMedia.attributes} />);

    expect(screen.getByTestId("watch-link").getAttribute("href")).toContain("iRmaQV9HERw");
  });

  it("should render event slides correctly", () => {
    render(<ResourceEvent attributes={mockEventMedia.attributes} />);

    expect(screen.getByTestId("event-slides").getAttribute("href")).toContain(
      "webinar-the-journey-to-paperless-trade.pdf"
    );
  });
});
