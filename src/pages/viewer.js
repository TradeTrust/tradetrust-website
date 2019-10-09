import React from "react";
import NavigationBar from "../components/Layout/NavigationBar";
import Footer from "../components/Layout/Footer";
import ViewerPageContainer from "../components/ViewerPageContainer";
import { PrintWatermark } from "../components/PrintWatermark";
import { isWatermarkFeatureActive } from "../config/feature-config";

export const ViewerPage = () => (
  <>
    {isWatermarkFeatureActive && <PrintWatermark />}
    <NavigationBar />
    <ViewerPageContainer />
    <Footer />
  </>
);
