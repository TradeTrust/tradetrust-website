import React from "react";
import { LandingSection } from "./HomePageContent/LandingSection";
import { MainBenefitsSection } from "./HomePageContent/MainBenefitsSection";
import { DocumentationSection } from "./HomePageContent/DocumentationSection";
import { EmailSection } from "./HomePageContent/EmailSection";
import { DropZoneSectionContainer } from "./HomePageContent/DropZoneSection";

const MainPageContainer = () => {
  return (
    <>
      <DropZoneSectionContainer />
      <LandingSection />
      <MainBenefitsSection />
      <EmailSection />
      <DocumentationSection />
    </>
  );
};

export default MainPageContainer;
