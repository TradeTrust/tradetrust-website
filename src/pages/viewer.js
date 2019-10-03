import React from "react";
import NavigationBar from "../components/Layout/NavigationBar";
import FooterBar from "../components/Layout/FooterBar";
import ViewerPageContainer from "../components/ViewerPageContainer";
import PrintWatermark from "../components/PrintWatermark";
import { isWatermarkFeatureActive } from "../config/feature-config";

export const ViewerPage = () => (
  <>
    {isWatermarkFeatureActive && <PrintWatermark />}
    <NavigationBar />
    <ViewerPageContainer />
    <FooterBar />
  </>
);
