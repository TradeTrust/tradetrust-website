import React from "react";
import { ResourceDownload } from "./ResourceDownload";

export default {
  title: "UI/ResourceDownload",
  component: ResourceDownload,
  parameters: {
    componentSubtitle: "ResourceDownload with pdf",
  },
};

export const Default = () => {
  return (
    <ResourceDownload
      title="Newsletters"
      resources={[
        {
          attributes: {
            title: "TradeTrust Newsletter Issue 01",
            file: "/static/images/newsletter/TradeTrust_Newsletter_Issue01.pdf",
          },
        },
        {
          attributes: {
            title: "TradeTrust Newsletter Issue 02",
            file: "/static/images/newsletter/TradeTrust_Newsletter_Issue02.pdf",
          },
        },
        {
          attributes: {
            title: "TradeTrust Newsletter Issue 03",
            file: "/static/images/newsletter/Tradetrust_Newsletter_Issue03.pdf",
          },
        },
      ]}
    />
  );
};
