import React, { FunctionComponent } from "react";
import { Helmet } from "react-helmet";
import { GuidelinesContent } from "../components/Guidelines";
import { Page } from "../components/Layout/Page";

export const Guidelines: FunctionComponent = () => (
  <>
    <Helmet>
      <meta
        name="description"
        content="We also welcome developers who wish to work on non-Ethereum blockchains using TradeTrust. Here is a set of guidelines for easier alignment and integration with the TradeTrust framework."
      />
      <meta
        property="og:description"
        content="We also welcome developers who wish to work on non-Ethereum blockchains using TradeTrust. Here is a set of guidelines for easier alignment and integration with the TradeTrust framework."
      />
      <meta property="og:title" content="TradeTrust - Guidelines For Non-Ethereum" />
      <meta property="og:url" content={`${window.location.origin}/guidelines`} />
      <title>TradeTrust - Guidelines For Non-Ethereum</title>
      <meta
        name="keywords"
        content="Blockchain, Ethereum, Electronic Trade Document, Verifiable Document, Digital Trade Document, Transferable Documents, Polygon, Cryptocurrency, Crypto"
      />
    </Helmet>
    <Page title="Using TradeTrust with non-Ethereum blockchain">
      <GuidelinesContent />
    </Page>
  </>
);
