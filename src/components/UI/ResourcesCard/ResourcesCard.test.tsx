import { render, screen } from "@testing-library/react";
import React from "react";
import { ResourcesCard } from "./ResourcesCard";

const youtubeResource = {
  title: "TradeTrust Overview",
  youtubeEmbedCode: "NcR1M9NJ-PE",
  tag: "Non-Technical",
  description:
    "This non-technical session helps provide a foundational and critical understanding of TradeTrust as a digital utility as well as the mental framing necessary as a pre-requisite for subsequent webinars.",
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
};

const placeholderResource = {
  title: "TradeTrust Workshop Coming Soon",
  placeholderText: "Coming soon after 22 Jul 2024",
  tag: "Technical",
  description:
    "This non-technical session helps provide a foundational and critical understanding of TradeTrust as a digital utility as well as the mental framing necessary as a pre-requisite for subsequent webinars.",
  downloads: [],
};

describe("ResourceCard", () => {
  it("should render title correctly", () => {
    render(<ResourcesCard details={youtubeResource} />);

    expect(screen.queryAllByText("TradeTrust Overview")).toHaveLength(1);
  });

  it("should render youtube version correctly", () => {
    render(<ResourcesCard details={youtubeResource} />);

    expect(screen.getAllByTestId("youtubeEmbed-iframe")).toHaveLength(1);
    expect(screen.getAllByTestId("youtubeEmbed-title-link")).toHaveLength(1);
  });

  it("should render placeholder version correctly", () => {
    render(<ResourcesCard details={placeholderResource} />);

    expect(screen.getAllByTestId("placeholder")).toHaveLength(1);
    expect(screen.getAllByTestId("placeholder-title")).toHaveLength(1);
  });

  it("should render download links correctly", () => {
    render(<ResourcesCard details={youtubeResource} />);

    expect(screen.getAllByTestId("download-link")).toHaveLength(2);
  });
});
