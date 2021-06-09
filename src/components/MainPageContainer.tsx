import React from "react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import {
  resetCertificateState,
  retrieveCertificateByAction,
  retrieveCertificateByActionFailure,
  updateCertificate,
} from "../reducers/certificate";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { NestedDocumentState } from "../constants/NestedDocumentState";
// import { LandingSection } from "./HomePageContent/LandingSection";
// import { MainBenefitsSection } from "./HomePageContent/MainBenefitsSection";
// import { DocumentationSection } from "./HomePageContent/DocumentationSection";
// import { EmailSection } from "./HomePageContent/EmailSection";
// import { DropZoneSectionContainer } from "./HomePageContent/DropZoneSection";
import { getLogger } from "../utils/logger";

import { WelcomeSection } from "./HomePageContent/WelcomeSection";
import { MainBenefitsSection } from "./HomePageContent/MainBenefitsSection";
import { HowItWorksSection } from "./HomePageContent/HowItWorksSection";

const { error } = getLogger("component:mainpage");

export const MainPageContainer = (): React.ReactElement => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const loadCertificate = React.useCallback((payload: any) => dispatch(updateCertificate(payload)), [dispatch]);
  // event listener for any custom postMessage
  window.addEventListener("message", (event) => {
    if (event.data.type === NestedDocumentState.LOAD) {
      try {
        const doc = atob(event.data.payload);
        loadCertificate(JSON.parse(doc));
        history.push("/verify");
      } catch (e) {
        error("decode data not json: " + e);
      }
    }
  });
  React.useEffect(() => {
    if (location.search !== "") {
      const queryParams = queryString.parse(location.search);
      dispatch(resetCertificateState());
      const action = JSON.parse(queryParams.q as string);
      if (action.type === "DOCUMENT") {
        dispatch(retrieveCertificateByAction(action.payload));
      } else {
        dispatch(
          retrieveCertificateByActionFailure(`The type ${action.type} provided from the action is not supported`)
        );
      }
      history.push("/verify");
    }
  }, [dispatch, location, history]);
  return (
    <div className="text-lg">
      <WelcomeSection />
      <MainBenefitsSection />
      <HowItWorksSection />
    </div>
  );
};
