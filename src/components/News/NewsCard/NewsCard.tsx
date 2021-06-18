import React, { FunctionComponent } from "react";
import { Download } from "react-feather";
import { NewsItem } from "../types";
import { TagBordered } from "../../UI/Tag";

const NewsItemTitle: FunctionComponent<{ title: string }> = ({ title }) => {
  return <h5 className="mt-8 mb-2">{title}</h5>;
};

export const NewsCard: FunctionComponent<{ news: NewsItem }> = ({ news }) => {
  const isThumbnail = !!news.attributes.thumbnail;
  const image = isThumbnail ? news.attributes.thumbnail : "/static/images/news/news-generic.png";
  const isDownloadFile = !!news.attributes.file;

  return (
    <>
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
    </>
  );
};
