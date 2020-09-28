import React from "react";
import { ResourcesLink } from "./ResourcesLink";

const details = {
  title: "Source code",
  type: "link",
  details: {
    description: "View TradeTrust source code",
    url: "https://github.com/TradeTrust/tradetrust-website",
    icon: "/static/images/Github_Octocat.png",
  },
};

export default {
  title: "UI/ResourcesLink",
  component: ResourcesLink,
  parameters: {
    componentSubtitle: "ResourcesLink with icon",
  },
};

export const ResourcesLinkComponent = () => {
  return <ResourcesLink title={details.title} type={details.type} details={details.details} />;
};
