import { render, screen } from "@testing-library/react";
import React from "react";
import { ResourcesLinkProps } from "../../../types";
import { ResourcesLink } from "./ResourcesLink";

const mockInfo = {
  title: "Source code",
  type: "link",
  details: [
    {
      description: "View TradeTrust source code",
      url: "https://github.com/TradeTrust/tradetrust-website",
    },
  ],
  icon: "/static/images/Github_Octocat.png",
} as ResourcesLinkProps;

describe("ResourcesLink", () => {
  it("should render title correctly", () => {
    render(<ResourcesLink title={mockInfo.title} type={mockInfo.type} details={mockInfo.details} />);

    expect(screen.getAllByText(/Source code/)).toHaveLength(1);
  });

  it("should render redirect link correctly", () => {
    render(
      <ResourcesLink title={mockInfo.title} type={mockInfo.type} details={mockInfo.details} icon={mockInfo.icon} />
    );

    expect(screen.queryAllByTestId("link")).toHaveLength(1);
    expect(screen.queryAllByTestId("download")).toHaveLength(0);
  });

  it("should render download link correctly", () => {
    render(<ResourcesLink title={mockInfo.title} type="download" details={mockInfo.details} icon={mockInfo.icon} />);

    expect(screen.queryAllByTestId("link")).toHaveLength(0);
    expect(screen.queryAllByTestId("download")).toHaveLength(1);
  });

  it("should render icon if there are any icon", () => {
    render(
      <ResourcesLink title={mockInfo.title} type={mockInfo.type} details={mockInfo.details} icon={mockInfo.icon} />
    );

    expect(screen.queryAllByTestId("link-icon")).toHaveLength(1);
  });
});
