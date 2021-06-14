export enum NewsType {
  ARTICLE = "ARTICLE",
  NEWSLETTER = "NEWSLETTER",
  PARTNER_NEWS = "PARTNER_NEWS",
  PRESS_RELEASE = "PRESS_RELEASE",
  SPEECH = "SPEECH",
}

export type Article = {
  type: NewsType.ARTICLE;
  attributes: {
    title: string;
  };
  body: string;
};

// check if duplicated later
export type Newsletter = {
  type: NewsType.NEWSLETTER;
  attributes: {
    title: string;
    file: string;
  };
  body: string;
};

export type PartnerNews = {
  type: NewsType.PARTNER_NEWS;
  attributes: {
    title: string;
  };
  body: string;
};

export type PressRelease = {
  type: NewsType.PRESS_RELEASE;
  attributes: {
    title: string;
  };
  body: string;
};

export type Speech = {
  type: NewsType.SPEECH;
  attributes: {
    title: string;
  };
  body: string;
};

export type News = Article | Newsletter | PartnerNews | PressRelease | Speech;
