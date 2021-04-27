import React from "react";
import { LandingSection } from "./HomePageContent/LandingSection";
import { MainBenefitsSection } from "./HomePageContent/MainBenefitsSection";
import { DocumentationSection } from "./HomePageContent/DocumentationSection";
import { DropZoneSectionContainer } from "./HomePageContent/DropZoneSection";
import { updateCertificate } from "../reducers/certificate";
import { getLogger } from "../utils/logger";
import { connect } from "react-redux";
import { NestedDocumentState } from "./../constants/NestedDocumentState";

const { error } = getLogger("component:mainpage");

const MainPage = ({ loadCertificate }: { loadCertificate: (certificate: any) => void }) => {
  // event listener for any custom postMessage
  window.addEventListener("message", (event) => {
    if (event.data.type === NestedDocumentState.LOAD) {
      try {
        const doc = atob(event.data.payload);
        loadCertificate(JSON.parse(doc));
      } catch (e) {
        error("decode data not json: " + e);
      }
    }
  });

  return (
    <div className="text-lg">
      <DropZoneSectionContainer />
      <LandingSection />
      <MainBenefitsSection />
      <DocumentationSection />
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  loadCertificate: (payload: any) => dispatch(updateCertificate(payload)),
});

export const MainPageContainer = connect(null, mapDispatchToProps)(MainPage);
