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
      <meta property="og:title" content="TradeTrust - An easy way to check and verify your documents" />
      <meta property="og:description" content="Add Tradetrust description" />
      <meta property="og:url" content={`${window.location.origin}/webinar`} />
      <title>TradeTrust - Webinar</title>
    </Helmet>
    <SectionRegister />
    <SectionBy />
    <SectionDetails />
    <SectionTopics />
    <SectionAbout />
  </>
);
