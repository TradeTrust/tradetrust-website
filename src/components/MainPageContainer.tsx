import React from "react";
import AboutSection from "./HomePageContent/AboutSection";
import DropZoneSection from "./HomePageContent/DropZoneSection";

export const MainPageContainer = () => (
  <div className="container-fluid">
    <DropZoneSection />
    <AboutSection />
  </div>
);
