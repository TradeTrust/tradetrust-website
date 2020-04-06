import React, { useState } from "react";
import AboutSection from "./HomePageContent/AboutSection";
import { LandingSection } from "./HomePageContent/LandingSection";
import { MainBenefitsSection } from "./HomePageContent/MainBenefitsSection";
import { DropZoneSectionContainer } from "./HomePageContent/DropZoneSection";
import { OverlayYoutube } from "./UI/Overlay";
import { CSSTransition } from "react-transition-group";

const MainPageContainer = () => {
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  return (
    <>
      <CSSTransition
        in={isOverlayVisible}
        timeout={400}
        classNames="fade"
        unmountOnExit
        onEnter={() => setOverlayVisible(true)}
        onExited={() => setOverlayVisible(false)}
      >
        <OverlayYoutube
          title="Digitalising Trust for Cross-Border Trade"
          youtubeId="udvPQyuqEug"
          isOverlayVisible={isOverlayVisible}
          handleCloseOverlay={() => {
            setOverlayVisible(!isOverlayVisible);
          }}
        />
      </CSSTransition>
      <LandingSection isOverlayVisible={isOverlayVisible} setOverlayVisible={setOverlayVisible} />
      <MainBenefitsSection />
      <DropZoneSectionContainer />
      <AboutSection />
    </>
  );
};

export default MainPageContainer;
