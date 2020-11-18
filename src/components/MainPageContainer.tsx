import React from "react";
import { LandingSection } from "./HomePageContent/LandingSection";
import { MainBenefitsSection } from "./HomePageContent/MainBenefitsSection";
import { DocumentationSection } from "./HomePageContent/DocumentationSection";
import { EmailSection } from "./HomePageContent/EmailSection";
import { DropZoneSectionContainer } from "./HomePageContent/DropZoneSection";

const MainPageContainer = () => {
  return (
    <div className="text-lg">
      <DropZoneSectionContainer />
      <LandingSection />
      <MainBenefitsSection />
      <EmailSection />
      <DocumentationSection />
    </div>
  );
};

export default MainPageContainer;
