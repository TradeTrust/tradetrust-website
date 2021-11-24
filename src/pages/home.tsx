import React, { FunctionComponent } from "react";
import { Helmet } from "react-helmet";
import { HomePageContainer } from "../components/HomePageContent";

export const HomePage: FunctionComponent = () => {
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="TradeTrust lets you verify the documents you have of anyone from any issuer. All in one place."
        />
        <meta
          property="og:description"
          content="TradeTrust lets you verify the documents you have of anyone from any issuer. All in one place."
        />
        <meta property="og:title" content="TradeTrust - Home" />
        <meta property="og:url" content={`${window.location.origin}`} />
        <title>TradeTrust - Home</title>
      </Helmet>
      <HomePageContainer />
    </>
  );
};
