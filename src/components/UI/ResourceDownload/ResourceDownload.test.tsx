import { render, screen } from "@testing-library/react";
import React from "react";
import { ResourceDownload, Newsletter } from "./ResourceDownload";

const mockTitle = "Source code";
const mockResources: Newsletter[] = [
  {
    attributes: {
      title: "TradeTrust Newsletter Issue 01",
      file: "/static/images/newsletter/TradeTrust_Newsletter_Issue01.pdf",
    },
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
