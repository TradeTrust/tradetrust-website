import React from "react";
import { Helmet } from "react-helmet";
import { EmailSuccessPageContainer } from "../components/EmailSuccessPageContainer";

export const EmailSuccessPage = () => (
  <>
    <Helmet>
      <meta property="og:url" content="https://tradetrust.io" />
      <meta property="og:title" content="TradeTrust - An easy way to check and verify your documents" />
      <meta property="og:description" content="Add Tradetrust description" />
      <meta property="og:url" content={`${window.location.origin}`} />
      <title>TradeTrust - An easy way to check and verify your documents</title>
    </Helmet>
    <EmailSuccessPageContainer />
  </>
);
