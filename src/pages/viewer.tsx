import React from "react";
import { Helmet } from "react-helmet";
import ViewerPageContainer from "../components/ViewerPageContainer";
import { PrintWatermark } from "../components/PrintWatermark";
import { FeatureFlag } from "../components/FeatureFlag";

export const ViewerPage = () => (
  <>
    <Helmet>
      <meta property="og:url" content="https://tradetrust.io" />
      <meta property="og:title" content="TradeTrust - An easy way to check and verify your documents" />
      <meta property="og:description" content="Add Tradetrust description" />
      <meta property="og:url" content={`${window.location.origin}`} />
      <title>TradeTrust - An easy way to check and verify your documents</title>
    </Helmet>
    <FeatureFlag name="WATERMARK">
      <PrintWatermark />
    </FeatureFlag>
    <ViewerPageContainer />
  </>
);
