import React from "react";
import { render, screen } from "@testing-library/react";
import { NewsItem } from "./NewsItem";
import { mockNewsDefault, mockNewsFile, mockNewsLink, mockNewsThumbnail } from "./NewsItem.mock";

describe("News", () => {
  it("should render title", () => {
    render(<NewsItem news={mockNewsDefault} />);
    expect(screen.getByText("foobar")).not.toBeNull();
  });

  it("should render date", () => {
    render(<NewsItem news={mockNewsDefault} />);
    expect(screen.getByText("3 Feb 2021")).not.toBeNull();
  });

  it("should render download when there is file", () => {
    render(<NewsItem news={mockNewsFile} />);
    expect(screen.getByTestId("news-item-link").getAttribute("href")).toBe(
      "/static/uploads/TradeTrust_Newsletter_Issue01.pdf"
    );
  });

  it("should render external link when there is link", () => {
    render(<NewsItem news={mockNewsLink} />);
    expect(screen.getByTestId("news-item-link").getAttribute("href")).toBe(
      "https://www.swift.com/swift-at-sibos/joining-forces-trade-digitisation"
    );
  });

  it("should render generic thumbnail when there is no thumbnail", () => {
    render(<NewsItem news={mockNewsDefault} />);
    expect(screen.getByTestId("news-item-thumbnail").getAttribute("style")).toBe(
      "background-image: url(/static/images/news/news-generic.png);"
    );
  });

  it("should render thumbnail when there is thumbnail", () => {
    render(<NewsItem news={mockNewsThumbnail} />);
    expect(screen.getByTestId("news-item-thumbnail").getAttribute("style")).toBe(
      "background-image: url(/static/uploads/news-01.jpg);"
    );
  });
});
