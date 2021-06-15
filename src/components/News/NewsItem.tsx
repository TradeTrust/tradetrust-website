import React, { FunctionComponent } from "react";
import styled from "@emotion/styled";
import { Download } from "react-feather";
import { News } from "./types";
import { TagSolidTeal } from "./../UI/Tag";

const NewsCard = styled.div`
  .bg-tint {
    background-color: rgba(0, 0, 0, 0.6);
  }
`;

const NewsCardContent: FunctionComponent<{ title: string; date: string }> = ({ title, date }) => {
  return (
    <>
      <h5>{title}</h5>
      <p>{date}</p>
    </>
  );
};

export const NewsItem: FunctionComponent<{ news: News }> = ({ news }) => {
  const image = news.attributes.thumbnail ?? "/static/images/news/news-generic.jpg";

  return (
    <NewsCard className="text-white p-8 relative h-full">
      <div
        data-testid="news-item-thumbnail"
        style={{ backgroundImage: `url(${image})` }}
        className="bg-center bg-no-repeat bg-cover text-white p-8 absolute top-0 left-0 w-full h-full"
      />
      <div className="bg-tint absolute top-0 left-0 w-full h-full" />
      <div className="relative z-10">
        <div className="flex flex-wrap">
          <TagSolidTeal>{news.type}</TagSolidTeal>
          {news.attributes.file && (
            <a
              data-testid="news-item-file"
              href={news.attributes.file}
              download={news.attributes.title}
              className="border border-white text-white p-2 rounded"
            >
              <Download />
            </a>
          )}
        </div>
        {news.attributes.link ? (
          <a data-testid="news-item-link" href={news.attributes.link} target="_blank" rel="noopener noreferrer">
            <NewsCardContent title={news.attributes.title} date={news.attributes.date} />
          </a>
        ) : (
          <NewsCardContent title={news.attributes.title} date={news.attributes.date} />
        )}
      </div>
    </NewsCard>
  );
};
