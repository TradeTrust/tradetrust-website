import React, { FunctionComponent } from "react";
import { Helmet } from "react-helmet";
import { HomePageContainer } from "../components/HomePageContent";

export const HomePage: FunctionComponent = () => {
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="TradeTrust is a digital utility that comprises a set of globally-accepted standards and frameworks that connects governments and businesses to a public blockchain to enable trusted interoperability and exchanges of electronic trade documents across digital platforms."
        />
        <meta
          property="og:description"
          content="TradeTrust is a digital utility that comprises a set of globally-accepted standards and frameworks that connects governments and businesses to a public blockchain to enable trusted interoperability and exchanges of electronic trade documents across digital platforms."
        />
        <meta property="og:title" content="TradeTrust - Digitised Global Trade" />
        <meta property="og:url" content={`${window.location.origin}`} />
        <title>TradeTrust - Digitised Global Trade</title>
        <meta
          name="keywords"
          content="Blockchain, NFT, Ethereum, Electronic Trade Document, Digital Trade Document, Transferable Documents, Electronic Bill of Lading, Bill of Lading, Verifiable Document, Certificate of Origin"
        />
      </Helmet>
      <HomePageContainer />
    </>
  );
};
