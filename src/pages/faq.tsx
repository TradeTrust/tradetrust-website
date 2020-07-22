import React from "react";
import { Helmet } from "react-helmet";
import { FaqContent } from "../components/FAQ/FaqContent";

export const FaqPage = () => (
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
      <meta property="og:title" content="TradeTrust - Frequently Asked Questions" />
      <meta property="og:url" content={`${window.location.origin}/faq`} />
      <title>TradeTrust - Frequently Asked Questions</title>
    </Helmet>
    <FaqContent />
  </>
);
