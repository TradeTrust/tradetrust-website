import React from "react";
import { Helmet } from "react-helmet";
import {
  SectionRegister,
  SectionBy,
  SectionDetails,
  SectionTopics,
  SectionAbout,
} from "../components/WebinarPageContent";

export const WebinarPage = () => (
  <>
    <Helmet>
      <meta
        property="description"
        content="Advance your knowledge with our captivating talks, interactive content and more for free."
      />
      <meta
        property="og:description"
        content="Advance your knowledge with our captivating talks, interactive content and more for free."
      />
      <meta property="og:title" content="TradeTrust - An easy way to check and verify your documents" />
      <meta property="og:url" content={`${window.location.origin}/webinar`} />
      <title>TradeTrust - Webinar Registration</title>
    </Helmet>
    <SectionRegister />
    <SectionBy />
    <SectionDetails />
    <SectionTopics />
    <SectionAbout />
  </>
);
