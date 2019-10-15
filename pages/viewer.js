import React from "react";
import NextSeo from "next-seo";
import { connect } from "react-redux";
import NavigationBar from "../src/components/Layout/NavigationBar";
import Footer from "../src/components/Layout/Footer";
import ViewerPageContainer from "../src/components/ViewerPageContainer";
import PrintWatermark from "../src/components/PrintWatermark";
import { DEFAULT_SEO } from "../src/config";
import { isWatermarkFeatureActive } from "../src/config/feature-config";

const VerifierPage = () => (
  <>
    <NextSeo config={DEFAULT_SEO} />
    {isWatermarkFeatureActive && <PrintWatermark />}
    <NavigationBar />
    <ViewerPageContainer />
    <Footer />
  </>
);

export default connect()(VerifierPage);
