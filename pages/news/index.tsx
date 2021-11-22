import React from "react";
import { NextPage } from "next";

import { Page } from "../../src/components/Layout/Page";
import { News } from "../../src/components/News";
import { NextSeo } from "next-seo";
import { SEO_NEWS } from "../../src/common/utils/seo";

const NewsPage: NextPage = () => {
  return (
    <>
      <NextSeo {...SEO_NEWS} />
      <Page title="News">
        <p className="mt-2 mb-12">Check out our events and browse through our latest news and official statements.</p>
        <News />
      </Page>
    </>
  );
};

export default NewsPage;
