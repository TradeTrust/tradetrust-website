import React from "react";
import { Helmet } from "react-helmet";
import { DropZoneSectionContainer } from "../components/VerifyPageContent/DropZoneSection";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import {
  resetCertificateState,
  retrieveCertificateByAction,
  retrieveCertificateByActionFailure,
} from "../reducers/certificate";
import { useDispatch } from "react-redux";

const VerifyPage = (): React.ReactElement => {
  const location = useLocation();
  const dispatch = useDispatch();
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
    }
  }, [dispatch, location]);
  return (
    <>
      <Helmet>
        <meta
          property="description"
          content="TradeTrust lets you verify the documents you have of anyone from any issuer. All in one place."
        />
        <meta
          property="og:description"
          content="TradeTrust lets you verify the documents you have of anyone from any issuer. All in one place."
        />
        <meta property="og:title" content="TradeTrust - An easy way to check and verify your documents" />
        <meta property="og:url" content={`${window.location.origin}/verify`} />
        <title>TradeTrust - Verify</title>
      </Helmet>
      <DropZoneSectionContainer />
    </>
  );
};

export default VerifyPage;
