import React, { FunctionComponent } from "react";
import { Helmet } from "react-helmet";
import { LegalityPageContent } from "../components/LegalityPageContent";

export const LegalityPage: FunctionComponent = () => (
  <>
    <Helmet>
      <meta name="description" content="A framework that was designed to achieve legal interoperability." />
      <meta property="og:description" content="A framework that was designed to achieve legal interoperability." />
      <meta property="og:title" content="TradeTrust - Legality" />
      <meta property="og:url" content={`${window.location.origin}/eta`} />
      <title>TradeTrust - Legality</title>
      <meta
        name="keywords"
        content="Blockchain, NFT, Ethereum, Electronic Trade Document, Verifiable Document, Digital Trade Document, Transferable Documents, Electronic Transactions Act, Bill of Lading"
      />
    </Helmet>
    <LegalityPageContent />
  </>
);
