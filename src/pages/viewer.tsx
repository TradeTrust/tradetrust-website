import React from "react";
import { Helmet } from "react-helmet";
import ViewerPageContainer from "../components/ViewerPageContainer";
import { PrintWatermark } from "../components/PrintWatermark";
import { FeatureFlag } from "../components/FeatureFlag";

export const ViewerPage = () => (
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
      <meta property="og:url" content={`${window.location.origin}/viewer`} />
      <title>TradeTrust - Viewer</title>
    </Helmet>
    <FeatureFlag name="WATERMARK">
      <PrintWatermark />
    </FeatureFlag>
    <ViewerPageContainer />
  </>
);
