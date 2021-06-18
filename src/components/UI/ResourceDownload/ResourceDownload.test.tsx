import { render, screen } from "@testing-library/react";
import React from "react";
import { ResourceDownload } from "./ResourceDownload";
import { NewsTag, NewsItem } from "../../News/types";

const mockTitle = "Source code";
const mockResources: NewsItem[] = [
  {
    slug: "foobar",
    type: NewsTag.NEWSLETTER,
    attributes: {
      title: "TradeTrust Newsletter Issue 01",
      date: "3 Feb 2021",
      file: "/static/images/newsletter/TradeTrust_Newsletter_Issue01.pdf",
    },
    body: "",
  },
];

describe("ResourceDownload", () => {
  it("should render download link correctly", () => {
    render(<ResourceDownload title={mockTitle} resources={mockResources} />);

    expect(screen.getByText("TradeTrust Newsletter Issue 01").getAttribute("href")).toContain(
      "TradeTrust_Newsletter_Issue01.pdf"
    );
  });
});
