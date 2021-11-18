import React, { FunctionComponent } from "react";
import { Helmet } from "react-helmet";
import { GuidelinesContent } from "../components/Guidelines";
import { Page } from "../components/Layout/Page";

export const Guidelines: FunctionComponent = () => (
  <>
    <Helmet>
      <meta name="description" content="Guidelines on Using TradeTrust with Non-Ethereum Blockchains." />
      <meta property="og:description" content="Guidelines on Using TradeTrust with Non-Ethereum Blockchains." />
      <meta property="og:title" content="TradeTrust - Guidelines" />
      <meta property="og:url" content={`${window.location.origin}/guidelines`} />
      <title>TradeTrust - Guidelines</title>
    </Helmet>
    <Page
      title="Mandatory Properties of a blockchain required by the TradeTrust framework"
      subtitle="Using TradeTrust with Non-Ethereum Blockchain"
    >
      <GuidelinesContent />
    </Page>
  </>
);
