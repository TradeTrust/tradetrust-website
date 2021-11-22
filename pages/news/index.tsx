import React from "react";
import { NextPage } from "next";
import Head from "next/head";

import { getHeadersFromContext } from "../../src/utils/index";
import { NextPageProps } from "../../src/types";
import { Page } from "../../src/components/Layout/Page";
import { News } from "../../src/components/News";

const NewsPage: NextPage<NextPageProps> = ({ headers }) => {
  return (
    <>
      <Head>
        <meta
          property="description"
          content="Check out our events and browse through our latest news and official statements."
        />
        <meta
          property="og:description"
          content="Check out our events and browse through our latest news and official statements."
        />
        <meta property="og:title" content="TradeTrust - An easy way to check and verify your documents" />
        <meta property="og:url" content={`${headers.host}/news`} />
        <title>TradeTrust - News</title>
      </Head>
      <Page title="News">
        <p className="mt-2 mb-12">Check out our events and browse through our latest news and official statements.</p>
        <News />
      </Page>
    </>
  );
};

NewsPage.getInitialProps = async (ctx) => {
  return {
    headers: getHeadersFromContext(ctx),
  };
};

export default NewsPage;
