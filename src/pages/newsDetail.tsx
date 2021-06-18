import React, { FunctionComponent } from "react";
import { BackArrow } from "@govtechsg/tradetrust-ui-components";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

export const NewsPageDetail: FunctionComponent = () => {
  const location = useLocation();

  return (
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
        <meta property="og:url" content={`${window.location.origin}${location.pathname}`} />
        <title>TradeTrust - News</title>
      </Helmet>
      <div className="container py-12">
        <div className="flex">
          <div className="w-auto">
            <Link to="/news">
              <BackArrow />
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap py-4 mb-8">
          <div className="w-full lg:w-2/3">
            <p>News detail here</p>
          </div>
          <div className="w-full lg:w-1/3">
            <p>Newsletters here</p>
          </div>
        </div>
      </div>
    </>
  );
};
