import React, { FunctionComponent } from "react";
import { Helmet } from "react-helmet";
import { EtaPageContent } from "../components/EtaPageContent";

export const EtaPage: FunctionComponent = () => (
  <>
    <Helmet>
      <meta
        name="description"
        content="Have some questions in mind? Here are a list of collated questions and answers that might answer your questions."
      />
      <meta
        property="og:description"
        content="Have some questions in mind? Here are a list of collated questions and answers that might answer your questions."
      />
      <meta property="og:title" content="TradeTrust - Electronic Transactions Act" />
      <meta property="og:url" content={`${window.location.origin}/eta`} />
      <title>TradeTrust - Electronic Transactions Act</title>
    </Helmet>
    <EtaPageContent />
  </>
);
