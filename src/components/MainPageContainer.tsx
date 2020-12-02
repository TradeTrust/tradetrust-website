import React, { useEffect } from "react";
import { LandingSection } from "./HomePageContent/LandingSection";
import { MainBenefitsSection } from "./HomePageContent/MainBenefitsSection";
import { DocumentationSection } from "./HomePageContent/DocumentationSection";
import { EmailSection } from "./HomePageContent/EmailSection";
import { DropZoneSectionContainer } from "./HomePageContent/DropZoneSection";
import { updateCertificate } from "../reducers/certificate";
import { getLogger } from "../utils/logger";
import { connect } from "react-redux";

const { error } = getLogger("component:mainpage");

const MainPage = () => {
  useEffect(() => {
    //if there is a parent window, send a READY to parent
    if (window.opener) {
      window.opener.postMessage({ type: "READY" });
    }

    //detecting message from parent window
    window.addEventListener(
      "message",
      (event) => {
        if (event.data?.type === "LOAD_DOCUMENT" && event.data.payload) {
          try {
            const doc = atob(event.data.payload);
            console.log(doc);
            updateCertificate(JSON.parse(doc));
          } catch (e) {
            error("decode data not json: " + e);
          }
        }
      },
      false
    );
  }, []);

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

const mapDispatchToProps = (dispatch: any) => ({
  updateCertificate: (payload: any) => dispatch(updateCertificate(payload)),
});

export const MainPageContainer = connect(null, mapDispatchToProps)(MainPage);
