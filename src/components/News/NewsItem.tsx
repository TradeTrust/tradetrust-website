import React, { FunctionComponent } from "react";
// import styled from "@emotion/styled";
import { Download } from "react-feather";
import { News } from "./types";
import { TagBordered } from "./../UI/Tag";

const NewsItemTitle: FunctionComponent<{ title: string }> = ({ title }) => {
  return <h5 className="mt-8 mb-2">{title}</h5>;
};

export const NewsItem: FunctionComponent<{ news: News }> = ({ news }) => {
  const isGenericImagePlaceholder = !!news.attributes.thumbnail;
  const image = isGenericImagePlaceholder ? news.attributes.thumbnail : "/static/images/news/news-generic.png";

  return (
    <div className="group text-white p-6 rounded-lg overflow-hidden relative h-full">
      <div
        data-testid="news-item-thumbnail"
        style={{ backgroundImage: `url(${image})` }}
        className="bg-center bg-no-repeat bg-cover text-white p-8 absolute top-0 left-0 w-full h-full"
      />
      <div
        className={`transition-color duration-200 ease-out bg-black absolute top-0 left-0 w-full h-full group-hover:opacity-80 ${
          isGenericImagePlaceholder ? "opacity-60" : "opacity-70"
        }`}
      />
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex-1">
          <div className="flex flex-wrap">
            <TagBordered className="border text-white border-white mr-2">{news.type}</TagBordered>
            {news.attributes.file && (
              <a
                data-testid="news-item-file"
                href={news.attributes.file}
                download={news.attributes.title}
                className="inline-block p-2 border border-white rounded-lg text-white hover:text-black hover:bg-white"
              >
                <Download width="20" height="20" />
              </a>
            )}
          </div>
        </div>
        {news.attributes.link ? (
          <a
            data-testid="news-item-link"
            href={news.attributes.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-white hover:text-cerulean-200"
          >
            <NewsItemTitle title={news.attributes.title} />
          </a>
        ) : (
          <NewsItemTitle title={news.attributes.title} />
        )}
        <p>{news.attributes.date}</p>
      </div>
    </div>
  );
};
