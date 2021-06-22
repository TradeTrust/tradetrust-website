import React from "react";
import { LandingSection } from "./HomePageContent/LandingSection";
import { MainBenefitsSection } from "./HomePageContent/MainBenefitsSection";
import { DocumentationSection } from "./HomePageContent/DocumentationSection";

export const MainPageContainer = (): React.ReactElement => {
  return (
    <div className="text-lg">
      <LandingSection />
      <MainBenefitsSection />
      <DocumentationSection />
    </div>
  );
};
