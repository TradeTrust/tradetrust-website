import React from "react";
import { ResourcesLinkProps } from "../../../types";
import { ResourcesLink } from "./ResourcesLink";

const mockDetails = {
  title: "Source code",
  type: "link",
  details: [
    {
      title: "View TradeTrust source code",
      url: "https://github.com/TradeTrust/tradetrust-website",
    },
  ],
  icon: "/static/images/Github_Octocat.png",
} as ResourcesLinkProps;

const mockDownloadDetails = {
  title: "Newsletters",
  type: "download",
  details: [
    {
      title: "TradeTrust Newsletter Issue 01",
      url: "/static/images/newsletter/TradeTrust_Newsletter_Issue01.pdf",
    },
    {
      title: "TradeTrust Newsletter Issue 02",
      url: "/static/images/newsletter/TradeTrust_Newsletter_Issue02.pdf",
    },
    {
      title: "TradeTrust Newsletter Issue 03",
      url: "/static/images/newsletter/Tradetrust_Newsletter_Issue03.pdf",
    },
  ],
} as ResourcesLinkProps;

export default {
  title: "UI/ResourcesLink",
  component: ResourcesLink,
  parameters: {
    componentSubtitle: "ResourcesLink with icon",
  },
};

export const ResourcesLinkTypeLink = () => {
  return (
    <ResourcesLink
      title={mockDetails.title}
      type={mockDetails.type}
      details={mockDetails.details}
      icon={mockDetails.icon}
    />
  );
};

export const ResourcesLinkTypeDownload = () => {
  return (
    <ResourcesLink
      title={mockDownloadDetails.title}
      type={mockDownloadDetails.type}
      details={mockDownloadDetails.details}
    />
  );
};
