import React, { FunctionComponent } from "react";
import { Helmet } from "react-helmet";
import { Page } from "../components/Layout/Page";
import { FaqSelect } from "../components/FAQ/FaqSelect";

export const FaqPage: FunctionComponent = () => (
  <>
    <Helmet>
      <meta
        name="description"
        content="Here are some of the answers to the most frequently asked questions regarding TradeTrust."
      />
      <meta
        property="og:description"
        content="Here are some of the answers to the most frequently asked questions regarding TradeTrust."
      />
      <meta property="og:title" content="TradeTrust - Frequently Asked Questions" />
      <meta property="og:url" content={`${window.location.origin}/faq`} />
      <title>TradeTrust - Frequently Asked Questions</title>
      <meta
        name="keywords"
        content="Blockchain, NFT, Ethereum, Electronic Trade Document, Verifiable Document, Digital Trade Document, Transferable Documents, Demo, Wallet ID, API, Gas Fee, Cryptocurrency, Crypto"
      />
    </Helmet>
    <Page title="Frequently Asked Questions">
      <FaqSelect />
    </Page>
  </>
);
