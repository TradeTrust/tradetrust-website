import React, { FunctionComponent } from "react";
import { compareDesc } from "date-fns";
import { importAll } from "./../../common/utils/importAll";
import { NewsType, News } from "./types";
import { NewsItem } from "./NewsItem";

const importedArticles = importAll(require.context("./../../../cms/article/", false, /\.md$/)) as News[];
const importedNewsletters = importAll(require.context("./../../../cms/newsletter/", false, /\.md$/)) as News[];
const importedPartnerNews = importAll(require.context("./../../../cms/partner-news/", false, /\.md$/)) as News[];
const importedPressReleases = importAll(require.context("./../../../cms/press-release/", false, /\.md$/)) as News[];
const importedSpeeches = importAll(require.context("./../../../cms/speech/", false, /\.md$/)) as News[];
const articles = importedArticles.map((news) => ({ ...news, type: NewsType.ARTICLE }));
const newsletters = importedNewsletters.map((news) => ({ ...news, type: NewsType.NEWSLETTER }));
const partnerNews = importedPartnerNews.map((news) => ({ ...news, type: NewsType.PARTNER_NEWS }));
const pressReleases = importedPressReleases.map((news) => ({
  ...news,
  type: NewsType.PRESS_RELEASE,
}));
const speeches = importedSpeeches.map((news) => ({ ...news, type: NewsType.SPEECH }));
let allNews = [...articles, ...newsletters, ...partnerNews, ...pressReleases, ...speeches];

const getSortedByDateDesc = (items: any[]) => {
  items.sort((a, b): number => {
    return compareDesc(new Date(a.attributes.date), new Date(b.attributes.date));
  });
  return items;
};

allNews = getSortedByDateDesc(allNews);

export const NewsContent: FunctionComponent = () => {
  return (
    <div className="flex flex-wrap py-4 -mx-4">
      {allNews.map((news, index) => {
        return (
          <div key={index} className="w-full lg:w-1/3 mb-4 px-4">
            <NewsItem news={news} />
          </div>
        );
      })}
    </div>
  );
};
