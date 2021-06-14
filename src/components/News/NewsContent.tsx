import React, { FunctionComponent } from "react";
import { importAll } from "./../../common/utils/importAll";
import { NewsType, News } from "./types";

const importedArticles = importAll(require.context("./../../../cms/article/", false, /\.md$/)) as News[];
const importedNewsletters = importAll(require.context("./../../../cms/newsletter/", false, /\.md$/)) as News[];
const importedPartnerNews = importAll(require.context("./../../../cms/partner-news/", false, /\.md$/)) as News[];
const importedPressReleases = importAll(require.context("./../../../cms/press-release/", false, /\.md$/)) as News[];
const importedSpeeches = importAll(require.context("./../../../cms/speech/", false, /\.md$/)) as News[];

export const NewsItem: FunctionComponent<{ news: News }> = ({ news }) => {
  return (
    <>
      <h6>{news.type}</h6>
      <h4>{news.attributes.title}</h4>
      <p>{news.attributes.thumbnail}</p>
      <p>{news.attributes.date}</p>
      {news.attributes.link && <p>{news.attributes.link}</p>}
      {news.attributes.file && <p>{news.attributes.file}</p>}
    </>
  );
};

export const NewsContent: FunctionComponent = () => {
  const articles = importedArticles.map((news) => ({ ...news, type: NewsType.ARTICLE }));
  const newsletters = importedNewsletters.map((news) => ({ ...news, type: NewsType.NEWSLETTER }));
  const partnerNews = importedPartnerNews.map((news) => ({ ...news, type: NewsType.PARTNER_NEWS }));
  const pressReleases = importedPressReleases.map((news) => ({
    ...news,
    type: NewsType.PRESS_RELEASE,
  }));
  const speeches = importedSpeeches.map((news) => ({ ...news, type: NewsType.SPEECH }));
  const allNews = [...articles, ...newsletters, ...partnerNews, ...pressReleases, ...speeches];

  return (
    <div className="flex flex-wrap py-4">
      {allNews.map((news, index) => {
        return (
          <div key={index} className="w-full lg:w-1/3 mb-4">
            <NewsItem news={news} />
          </div>
        );
      })}
    </div>
  );
};
