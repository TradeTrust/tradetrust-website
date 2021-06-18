import React, { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";
import { NewsItem } from "./../types";
import { NewsCard } from "../NewsCard";

const getLink = (news: NewsItem) => {
  switch (true) {
    case !!news.body:
      return `/news/${news.slug}`;
    case !!news.attributes.file:
      return news.attributes.file;
    default:
      return news.attributes.link;
  }
};

export const NewsLink: FunctionComponent<{ news: NewsItem }> = ({ news }) => {
  const isNavLink = !!news.body;
  const link = getLink(news);
  const sharedStylesLink = `group inline-block w-full p-6 rounded-lg overflow-hidden relative h-full text-white hover:text-white`;

  return (
    <>
      {isNavLink && link ? (
        <NavLink data-testid="news-item-link" to={link} className={`${sharedStylesLink}`}>
          <NewsCard news={news} />
        </NavLink>
      ) : (
        <a
          data-testid="news-item-link"
          className={`${sharedStylesLink}`}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <NewsCard news={news} />
        </a>
      )}
    </>
  );
};
