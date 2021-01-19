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
  videoTimeStamps: [
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

const placeholderResource = {
  title: "TradeTrust Workshop Coming Soon",
  placeholderText: "Coming soon after 22 Jul 2024",
  tag: "Technical",
  description:
    "This non-technical session helps provide a foundational and critical understanding of TradeTrust as a digital utility as well as the mental framing necessary as a pre-requisite for subsequent webinars.",
  downloads: [],
};

export default {
  title: "UI/ResourcesCard",
  component: ResourcesCard,
  parameters: {
    componentSubtitle: "ResourcesCard with youtube embed.",
  },
};

export const ResourcesCardYoutube = () => {
  return <ResourcesCard details={youtubeResource} />;
};

export const ResourcesCardPlaceholderText = () => {
  return <ResourcesCard details={placeholderResource} />;
};
