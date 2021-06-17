import React from "react";
import { NewsItem } from "./NewsItem";
import { mockNewsDefault, mockNewsFile, mockNewsLink, mockNewsThumbnail } from "./NewsItem.mock";

export default {
  title: "News/NewsItem",
  component: NewsItem,
  parameters: {
    componentSubtitle: "News item in listing page",
  },
};

export const NewsItemDefault = () => {
  return <NewsItem news={mockNewsDefault} />;
};

export const NewsItemFile = () => {
  return <NewsItem news={mockNewsFile} />;
};

export const NewsItemLink = () => {
  return <NewsItem news={mockNewsLink} />;
};

export const NewsItemThumbnail = () => {
  return <NewsItem news={mockNewsThumbnail} />;
};
