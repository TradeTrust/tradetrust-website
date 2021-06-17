import { NewsType, News } from "./types";

export const mockNewsDefault: News = {
  type: NewsType.NEWSLETTER,
  attributes: {
    title: "foobar",
    date: "3 Feb 2021",
  },
  body: "",
};

export const mockNewsFile: News = {
  ...mockNewsDefault,
  attributes: {
    ...mockNewsDefault.attributes,
    file: "/static/uploads/TradeTrust_Newsletter_Issue01.pdf",
  },
};

export const mockNewsLink: News = {
  ...mockNewsDefault,
  attributes: {
    ...mockNewsDefault.attributes,
    link: "https://www.swift.com/swift-at-sibos/joining-forces-trade-digitisation",
  },
};

export const mockNewsThumbnail: News = {
  ...mockNewsDefault,
  attributes: {
    ...mockNewsDefault.attributes,
    thumbnail: "/static/uploads/news-01.jpg",
  },
};
