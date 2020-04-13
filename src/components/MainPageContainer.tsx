import React, { useState, useEffect } from "react";
import { LandingSection } from "./HomePageContent/LandingSection";
import { MainBenefitsSection } from "./HomePageContent/MainBenefitsSection";
import { DocumentationSection } from "./HomePageContent/DocumentationSection";
import { DropZoneSectionContainer } from "./HomePageContent/DropZoneSection";
import { OverlayYoutube } from "./UI/Overlay";
import { CSSTransition } from "react-transition-group";
import { useKeyPress } from "./../common/hooks/useKeyPress";

const MainPageContainer = () => {
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const escapePress = useKeyPress("Escape");

  useEffect(() => {
    if (escapePress) {
      setOverlayVisible(false);
    }
  }, [escapePress]);

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
      <DropZoneSectionContainer />
      <LandingSection isOverlayVisible={isOverlayVisible} setOverlayVisible={setOverlayVisible} />
      <MainBenefitsSection />
      <DocumentationSection />
    </>
  );
};

export default MainPageContainer;
