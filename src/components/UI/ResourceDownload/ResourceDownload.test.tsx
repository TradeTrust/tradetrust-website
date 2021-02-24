import { render, screen } from "@testing-library/react";
import React from "react";
import { Resource } from "../../../types";
import { ResourceDownload } from "./ResourceDownload";

const mockTitle = "Source code";
const mockResources: Resource[] = [
  {
    title: "View TradeTrust source code",
    url: "https://github.com/TradeTrust/tradetrust-website",
  },
];

describe("ResourceDownload", () => {
  it("should render download link correctly", () => {
    render(<ResourceDownload title={mockTitle} resources={mockResources} />);

    expect(screen.queryAllByTestId("download")).toHaveLength(1);
  });
});
