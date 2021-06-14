import React, { FunctionComponent } from "react";
import { importAll } from "./../../common/utils/importAll";
import { NewsType, Article, Newsletter, PartnerNews, PressRelease, Speech, News } from "./types";

const importedArticles = importAll(require.context("./../../../cms/article/", false, /\.md$/)) as Article[];
const importedNewsletters = importAll(require.context("./../../../cms/newsletter/", false, /\.md$/)) as Newsletter[];
const importedPartnerNews = importAll(require.context("./../../../cms/partner-news/", false, /\.md$/)) as PartnerNews[];
const importedPressReleases = importAll(
  require.context("./../../../cms/press-release/", false, /\.md$/)
) as PressRelease[];
const importedSpeeches = importAll(require.context("./../../../cms/speech/", false, /\.md$/)) as Speech[];

export const NewsItem: FunctionComponent<{ news: News }> = ({ news }) => {
  switch (news.type) {
    case NewsType.NEWSLETTER:
      return (
        <>
          <h6>{news.attributes.title}</h6>
          <p>{news.attributes.file}</p>
        </>
      );
    default:
      return <h6>{news.attributes.title}</h6>;
  }
};

export const NewsContent: FunctionComponent = () => {
  const articles: Article[] = importedArticles.map((news) => ({ ...news, type: NewsType.ARTICLE }));
  const newsletters: Newsletter[] = importedNewsletters.map((news) => ({ ...news, type: NewsType.NEWSLETTER }));
  const partnerNews: PartnerNews[] = importedPartnerNews.map((news) => ({ ...news, type: NewsType.PARTNER_NEWS }));
  const pressReleases: PressRelease[] = importedPressReleases.map((news) => ({
    ...news,
    type: NewsType.PRESS_RELEASE,
  }));
  const speeches: Speech[] = importedSpeeches.map((news) => ({ ...news, type: NewsType.SPEECH }));
  const allNews: News[] = [...articles, ...newsletters, ...partnerNews, ...pressReleases, ...speeches];

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
