import React from "react";
import AboutSection from "./HomePageContent/AboutSection";
import { DropZoneSectionContainer } from "./HomePageContent/DropZoneSection";

const MainPageContainer = () => (
  <div className="container-fluid">
    <DropZoneSectionContainer />
    <AboutSection />
  </div>
);

export default MainPageContainer;
