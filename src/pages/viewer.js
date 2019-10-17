import React from "react";
import { Helmet } from "react-helmet";
import NavigationBar from "../components/Layout/NavigationBar";
import Footer from "../components/Layout/Footer";
import ViewerPageContainer from "../components/ViewerPageContainer";
import { PrintWatermark } from "../components/PrintWatermark";
import { isWatermarkFeatureActive } from "../config/feature-config";

export const ViewerPage = () => (
  <>
    <Helmet>
      <meta property="og:url" content="https://tradetrust.io" />
      <meta property="og:title" content="TradeTrust - An easy way to check and verify your documents" />
      <meta property="og:description" content="Add Tradetrust description" />
      <meta property="og:url" content={`${window.location.origin}`} />
      <title>TradeTrust - An easy way to check and verify your documents</title>
    </Helmet>
    {isWatermarkFeatureActive && <PrintWatermark />}
    <NavigationBar />
    <ViewerPageContainer />
    <Footer />
  </>
);
