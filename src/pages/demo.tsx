import React, { FunctionComponent } from "react";
import { Helmet } from "react-helmet";
import DemoFlow from "../components/Demo/DemoFlow"

export const DemoPage: FunctionComponent = () => (
  <>
    <Helmet>
      <meta
        property="description"
        content="TradeTrust lets you verify the documents you have of anyone from any issuer. All in one place."
      />
      <meta
        property="og:description"
        content="TradeTrust lets you verify the documents you have of anyone from any issuer. All in one place."
      />
      <meta property="og:title" content="TradeTrust - An easy way to check and verify your documents" />
      <meta property="og:url" content={`${window.location.origin}/demo`} />
      <title>TradeTrust - Demo</title>
    </Helmet>
    <DemoFlow />
  </>
);
