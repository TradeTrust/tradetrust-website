import { NewsTag, NewsItem } from "./../types";

export const mockNewsDefault: NewsItem = {
  slug: "foobar",
  type: NewsTag.NEWSLETTER,
  attributes: {
    title: "foobar",
    date: "3 Feb 2021",
  },
  body: "",
};

export const mockNewsThumbnail: NewsItem = {
  ...mockNewsDefault,
  attributes: {
    ...mockNewsDefault.attributes,
    thumbnail: "/static/uploads/news-01.jpg",
  },
};
