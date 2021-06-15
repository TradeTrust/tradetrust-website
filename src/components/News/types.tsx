export enum NewsType {
  ARTICLE = "Article",
  NEWSLETTER = "Newsletter",
  PARTNER_NEWS = "Partner News",
  PRESS_RELEASE = "Press Release",
  SPEECH = "Speech",
}

export type News = {
  type: NewsType.ARTICLE | NewsType.NEWSLETTER | NewsType.PARTNER_NEWS | NewsType.PRESS_RELEASE | NewsType.SPEECH;
  attributes: {
    title: string;
    date: string;
    thumbnail?: string;
    link?: string;
    file?: string;
  };
  body: string;
};
