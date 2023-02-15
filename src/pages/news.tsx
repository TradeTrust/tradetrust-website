import React, { FunctionComponent } from "react";
import { Helmet } from "react-helmet";
import { News } from "../components/News";
import { Page } from "../components/Layout/Page";

export const NewsPage: FunctionComponent = () => (
  <>
    <Helmet>
      <meta
        property="description"
        content="Check out TradeTrust latest events, news, official statements and browse through our quarterly issued Newsletters."
      />
      <meta
        property="og:description"
        content="Check out TradeTrust latest events, news, official statements and browse through our quarterly issued Newsletters."
      />
      <meta property="og:title" content="TradeTrust - Press Release, Newsletter and Articles" />
      <meta property="og:url" content={`${window.location.origin}/news`} />
      <title>TradeTrust - Press Release, Newsletter and Articles</title>
      <meta
        name="keywords"
        content="Blockchain, NFT, Ethereum, Electronic Trade Document, Verifiable Document, Transferable Documents, Digital Trade Document, Press Release, Newsletters, Articles"
      />
    </Helmet>
    <Page title="News">
      <p className="mt-2 mb-12">Check out our events and browse through our latest news and official statements.</p>
      <News />
    </Page>
  </>
);
