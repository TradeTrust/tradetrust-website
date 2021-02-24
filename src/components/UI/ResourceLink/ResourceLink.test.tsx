import { render, screen } from "@testing-library/react";
import React from "react";
import { Resource } from "../../../types";
import { ResourceLink } from "./ResourceLink";

const mockTitle = "Source code";
const mockIcon = "/static/images/Github_Octocat.png";
const mockResources: Resource[] = [
  {
    title: "View TradeTrust source code",
    url: "https://github.com/TradeTrust/tradetrust-website",
  },
];

describe("ResourceLink", () => {
  it("should render title correctly", () => {
    render(<ResourceLink title={mockTitle} resources={mockResources} />);

    expect(screen.getAllByText(/Source code/)).toHaveLength(1);
  });

  it("should render redirect link correctly", () => {
    render(<ResourceLink title={mockTitle} resources={mockResources} />);

    expect(screen.queryAllByTestId("link")).toHaveLength(1);
    expect(screen.queryAllByTestId("download")).toHaveLength(0);
  });

  it("should render icon if there are any icon", () => {
    render(<ResourceLink title={mockTitle} resources={mockResources} icon={mockIcon} />);

    expect(screen.queryAllByTestId("link-icon")).toHaveLength(1);
  });

  it("should render all links specified in details array", () => {
    mockResources.push({
      title: "View TradeTrust source code again",
      url: "https://github.com/TradeTrust/tradetrust-website",
    });
    render(<ResourceLink title={mockTitle} resources={mockResources} />);

    expect(screen.queryAllByTestId("link")).toHaveLength(2);
  });
});
