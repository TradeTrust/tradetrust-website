import React, { FunctionComponent } from "react";
// import styled from "@emotion/styled";
import { Download } from "react-feather";
import { News, NewsType } from "./types";
import { TagBordered } from "./../UI/Tag";

export const mockNewsDefault: News = {
  type: NewsType.NEWSLETTER,
  attributes: {
    title: "foobar",
    date: "3 Feb 2021",
  },
  body: "",
};

const NewsItemTitle: FunctionComponent<{ title: string }> = ({ title }) => {
  return <h5 className="mt-8 mb-2">{title}</h5>;
};

export const NewsItem: FunctionComponent<{ news: News }> = ({ news }) => {
  const isThumbnail = !!news.attributes.thumbnail;
  const image = isThumbnail ? news.attributes.thumbnail : "/static/images/news/news-generic.png";
  const isDownloadFile = !!news.attributes.file;
  const link = isDownloadFile ? news.attributes.file : news.attributes.link;

  return (
    <a
      data-testid="news-item-link"
      className="group inline-block w-full p-6 rounded-lg overflow-hidden relative h-full text-white hover:text-white"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div
        data-testid="news-item-thumbnail"
        style={{ backgroundImage: `url(${image})` }}
        className="bg-center bg-no-repeat bg-cover p-8 absolute top-0 left-0 w-full h-full"
      />
      <div
        className={`transition-color duration-200 ease-out bg-black absolute top-0 left-0 w-full h-full group-hover:opacity-80 ${
          isThumbnail ? "opacity-60" : "opacity-70"
        }`}
      />
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex-1">
          <div className="flex flex-wrap">
            <TagBordered className="flex items-center border border-white h-10 mr-2">{news.type}</TagBordered>
            {isDownloadFile && (
              <div className="flex items-center w-10 h-10 border border-white rounded-lg text-white">
                <Download width="20" height="20" className="m-auto" />
              </div>
            )}
          </div>
        </div>
        <NewsItemTitle title={news.attributes.title} />
        <p>{news.attributes.date}</p>
      </div>
    </a>
  );
};
