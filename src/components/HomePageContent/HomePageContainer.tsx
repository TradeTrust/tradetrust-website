import React from "react";
import {
  resetCertificateState,
  retrieveCertificateByAction,
  retrieveCertificateByActionFailure,
  updateCertificate,
} from "../../reducers/certificate";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { NestedDocumentState } from "../../constants/NestedDocumentState";
import { getLogger } from "../../utils/logger";

import { WelcomeSection } from "./WelcomeSection";
import { MainBenefitsSection } from "./MainBenefitsSection";
import { HowItWorksSection } from "./HowItWorksSection";
import { useRouter } from "next/dist/client/router";

const { error } = getLogger("component:mainpage");

export const HomePageContainer = (): React.ReactElement => {
  const router = useRouter();
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
    const { query, asPath } = router;
    if (Object.values(query).length > 0) {
      const hash = asPath.split("#")[1];

      const anchorStr = decodeURIComponent(hash);
      const anchor = anchorStr ? JSON.parse(anchorStr) : {};
      dispatch(resetCertificateState());
      const action = JSON.parse(query.q as string);
      if (action.type === "DOCUMENT") {
        dispatch(retrieveCertificateByAction(action.payload, anchor));
      } else {
        dispatch(
          retrieveCertificateByActionFailure(`The type ${action.type} provided from the action is not supported`)
        );
      }
      history.push("/verify");
    }
  }, [dispatch, router, history]);
  return (
    <div className="text-lg">
      <WelcomeSection />
      <MainBenefitsSection />
      <HowItWorksSection />
    </div>
  );
};
