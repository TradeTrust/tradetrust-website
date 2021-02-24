import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { ResourceWebinar, Webinar } from "./ResourceWebinar";

export const mockResourceWebinar: Webinar = {
  youtubeEmbedCode: "NcR1M9NJ-PE",
  tag: "Non-Technical",
  downloads: [
    {
      fileName: "TradeTrust Tech Webinar 1 - Overview.pdf",
      path: "/static/images/webinar/tradetrust-tech-webinar-1-overview.pdf",
    },
    {
      fileName: "TradeTrust Tech Webinar 1 - Demo.pdf",
      path: "/static/images/webinar/tradetrust-tech-webinar-1-demo.pdf",
    },
  ],
  videoChapters: [
    {
      title: "What is TradeTrust?",
      timeStamp: 80,
    },
    {
      title: "Who can use TradeTrust?",
      timeStamp: 100,
    },
  ],
};

describe("ResourceCard", () => {
  it("should render title correctly", () => {
    render(<ResourceWebinar title="TradeTrust Overview" description="" resource={mockResourceWebinar} />);

    expect(screen.queryAllByText("TradeTrust Overview")).toHaveLength(1);
  });

  it("should render youtube correctly", () => {
    render(<ResourceWebinar title="" description="" resource={mockResourceWebinar} />);

    expect(screen.getAllByTestId("youtubeEmbed-iframe")).toHaveLength(1);
    expect(screen.getAllByTestId("youtubeEmbed-title-link")).toHaveLength(1);
  });

  it("should render quick video link dropdown", () => {
    render(<ResourceWebinar title="" description="" resource={mockResourceWebinar} />);

    expect(screen.getAllByTestId("quickVideoLinksDropdown")).toHaveLength(1);
    fireEvent.click(screen.getByTestId("quickVideoLinksDropdown"));
    expect(screen.getAllByTestId("videoChaptersDropdown")).toHaveLength(2);
  });

  it("should render download links correctly", () => {
    render(<ResourceWebinar title="" description="" resource={mockResourceWebinar} />);

    expect(screen.getAllByTestId("download-link")).toHaveLength(2);
  });
});
