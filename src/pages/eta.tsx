import React, { FunctionComponent } from "react";
import { Helmet } from "react-helmet";
import { EtaPageContent } from "../components/EtaPageContent";

export const EtaPage: FunctionComponent = () => (
  <>
    <Helmet>
      <meta
        name="description"
        content="The Electronic Transactions Act (ETA) facilitates the use of e-commerce and e-transactions by giving e-contracts and e-signatures the same status as written contracts and signatures."
      />
      <meta
        property="og:description"
        content="The Electronic Transactions Act (ETA) facilitates the use of e-commerce and e-transactions by giving e-contracts and e-signatures the same status as written contracts and signatures."
      />
      <meta property="og:title" content="TradeTrust - Electronic Transactions Act (ETA)" />
      <meta property="og:url" content={`${window.location.origin}/eta`} />
      <title>TradeTrust - Electronic Transactions Act (ETA)</title>
      <meta
        name="keywords"
        content="Blockchain, NFT, Ethereum, Electronic Trade Document, Verifiable Document, Digital Trade Document, Transferable Documents, Electronic Transactions Act, Bill of Lading"
      />
    </Helmet>
    <EtaPageContent />
  </>
);
