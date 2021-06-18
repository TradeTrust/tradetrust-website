import React, { FunctionComponent } from "react";
import { Helmet } from "react-helmet";
import { News } from "../components/News";

export const NewsPage: FunctionComponent = () => (
  <>
    <Helmet>
      <meta
        property="description"
        content="Check out our events and browse through our latest news and official statements."
      />
      <meta
        property="og:description"
        content="Check out our events and browse through our latest news and official statements."
      />
      <meta property="og:title" content="TradeTrust - An easy way to check and verify your documents" />
      <meta property="og:url" content={`${window.location.origin}/news`} />
      <title>TradeTrust - News</title>
    </Helmet>
    <div className="container py-12">
      <div className="flex">
        <div className="w-full">
          <h1>News</h1>
        </div>
      </div>
      <div className="flex flex-wrap py-4 mb-8">
        <div className="w-full">Check out our events and browse through our latest news and official statements.</div>
      </div>
      <News />
    </div>
  </>
);
