import React, { FunctionComponent } from "react";
import { Helmet } from "react-helmet";
import { NewsContent } from "../components/News";

export const NewsPage: FunctionComponent = () => (
  <>
    <Helmet>
      <meta
        property="description"
        content="This series of tech talks is organised by the Infocomm Media Development Authority of Singapore (IMDA) and GovTech Singapore. It comprises six webinars and aims to provide professionals with knowledge on TradeTrust as a digital utility for cross border trade."
      />
      <meta
        property="og:description"
        content="This series of tech talks is organised by the Infocomm Media Development Authority of Singapore (IMDA) and GovTech Singapore. It comprises six webinars and aims to provide professionals with knowledge on TradeTrust as a digital utility for cross border trade."
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
      <NewsContent />
    </div>
  </>
);
