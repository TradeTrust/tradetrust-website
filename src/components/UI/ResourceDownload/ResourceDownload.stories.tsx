import React from "react";
import { ResourceDownload } from "./ResourceDownload";

export default {
  title: "UI/ResourceDownload",
  component: ResourceDownload,
  parameters: {
    componentSubtitle: "ResourceDownload with resources",
  },
};

export const Default = () => {
  return (
    <ResourceDownload
      title="Newsletters"
      resources={[
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
      ]}
    />
  );
};
