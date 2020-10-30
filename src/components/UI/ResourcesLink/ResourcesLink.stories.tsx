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

export default {
  title: "UI/ResourcesLink",
  component: ResourcesLink,
  parameters: {
    componentSubtitle: "ResourcesLink with icon",
  },
};

export const ResourcesLinkComponent = () => {
  return (
    <ResourcesLink
      title={mockDetails.title}
      type={mockDetails.type}
      details={mockDetails.details}
      icon={mockDetails.icon}
    />
  );
};
