import React from "react";
import { LandingSection } from "./HomePageContent/LandingSection";
import { MainBenefitsSection } from "./HomePageContent/MainBenefitsSection";
import { DocumentationSection } from "./HomePageContent/DocumentationSection";
import { EmailSection } from "./HomePageContent/EmailSection";
import { DropZoneSectionContainer } from "./HomePageContent/DropZoneSection";
import { AnnoucementBar } from "./UI/AnnoucementBar";

const MainPageContainer = () => {
  return (
    <>
      <AnnoucementBar />
      <DropZoneSectionContainer />
      <LandingSection />
      <MainBenefitsSection />
      <EmailSection />
      <DocumentationSection />
    </>
  );
};

export default MainPageContainer;
