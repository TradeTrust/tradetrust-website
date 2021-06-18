import React from "react";
import { ResourceDownload } from "./ResourceDownload";
import { NewsTag } from "../../News/types";

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
          slug: "foo bar",
          type: NewsTag.NEWSLETTER,
          attributes: {
            title: "TradeTrust Newsletter Issue 01",
            date: "3 Feb 2021",
            file: "/static/images/newsletter/TradeTrust_Newsletter_Issue01.pdf",
          },
          body: "",
        },
        {
          slug: "foo bar",
          type: NewsTag.NEWSLETTER,
          attributes: {
            title: "TradeTrust Newsletter Issue 02",
            date: "3 Feb 2021",
            file: "/static/images/newsletter/TradeTrust_Newsletter_Issue02.pdf",
          },
          body: "",
        },
        {
          slug: "foo bar",
          type: NewsTag.NEWSLETTER,
          attributes: {
            title: "TradeTrust Newsletter Issue 03",
            date: "3 Feb 2021",
            file: "/static/images/newsletter/Tradetrust_Newsletter_Issue03.pdf",
          },
          body: "",
        },
      ]}
    />
  );
};
