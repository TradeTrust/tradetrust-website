import React from "react";
import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import { NewsLink } from "./NewsLink";
import { NewsTag } from "../types";

const mock = {
  attributes: {
    title: "Singapore leading the way in promoting digital trade",
    date: "3 Feb 2021",
    link: "https://www.businesstimes.com.sg/opinion/singapore-leading-the-way-in-promoting-digital-trade",
  },
  body: "",
  slug: "singapore-leading-the-way-in-promoting-digital-trade",
  type: NewsTag.ARTICLE,
};

const mockFile = {
  ...mock,
  attributes: {
    ...mock.attributes,
    file: "/static/uploads/TradeTrust_Newsletter_Issue01.pdf",
  },
};

const mockInternalLink = {
  ...mock,
  body: "foo bar",
};

describe("NewsLink", () => {
  it("should render external link when there is link", () => {
    render(<NewsLink news={mock} />);
    expect(screen.getByTestId("news-item-link").getAttribute("href")).toBe(
      "https://www.businesstimes.com.sg/opinion/singapore-leading-the-way-in-promoting-digital-trade"
    );
  });

  it("should render download when there is file", () => {
    render(<NewsLink news={mockFile} />);
    expect(screen.getByTestId("news-item-link").getAttribute("href")).toBe(
      "/static/uploads/TradeTrust_Newsletter_Issue01.pdf"
    );
  });

  it("should render filename as internal news link when body has content", () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <NewsLink news={mockInternalLink} />
      </Router>
    );
    expect(screen.getByTestId("news-item-link").getAttribute("href")).toBe(
      "/news/singapore-leading-the-way-in-promoting-digital-trade"
    );
  });
});
