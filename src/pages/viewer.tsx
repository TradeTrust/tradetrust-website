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
        content="Verify documents from any issuer"
      />
      <meta
        property="og:description"
        content="Verify documents from any issuer."
      />
      <meta property="og:title" content="Check and verify your documents" />
      <meta property="og:url" content={`${window.location.origin}/viewer`} />
      <title>Document - Viewer</title>
    </Helmet>
    <FeatureFlag name="WATERMARK">
      <PrintWatermark />
    </FeatureFlag>
    <ViewerPageContainer />
  </>
);
