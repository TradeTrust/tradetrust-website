import React, { FunctionComponent } from "react";
import { Helmet } from "react-helmet";
import { MainPageContainer } from "../components/MainPageContainer";

export const HomePageContainer: FunctionComponent = () => {
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
        <meta property="og:title" content="TradeTrust - An easy way to check and verify your documents" />
        <meta property="og:url" content={`${window.location.origin}`} />
        <title>TradeTrust - An easy way to check and verify your documents</title>
      </Helmet>
      <MainPageContainer />
    </>
  );
};
