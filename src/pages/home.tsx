import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import queryString from "query-string";
import MainPageContainer from "../components/MainPageContainer";
import { connect } from "react-redux";
import {
  resetCertificateState,
  retrieveCertificateByAction,
  retrieveCertificateByActionFailure,
} from "../reducers/certificate";
import { FeatureFlag } from "./../components/FeatureFlag";
import { AddressResolver } from "../components/AddressResolver";

export const HomePage = (props: any) => {
  useEffect(() => {
    if (props.location.search !== "") {
      const queryParams = queryString.parse(props.location.search);
      props.resetCertificateState();
      const action = JSON.parse(queryParams.q as string);
      if (action.type === "DOCUMENT") {
        props.retrieveCertificateByAction(action.payload);
      } else {
        props.retrieveCertificateByActionFailure(`The type ${action.type} provided from the action is not supported`);
      }
    }
  }, [props]);

  return (
    <>
      <Helmet>
        <meta property="og:url" content="https://tradetrust.io" />
        <meta property="og:title" content="TradeTrust - An easy way to check and verify your documents" />
        <meta property="og:description" content="Add Tradetrust description" />
        <meta property="og:url" content={`${window.location.origin}`} />
        <title>TradeTrust - An easy way to check and verify your documents</title>
      </Helmet>
      <FeatureFlag name="ADDRESS_RESOLVER">
        <AddressResolver />
      </FeatureFlag>
      <MainPageContainer />
    </>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  retrieveCertificateByAction: (payload: any) => dispatch(retrieveCertificateByAction(payload)),
  retrieveCertificateByActionFailure: (payload: any) => dispatch(retrieveCertificateByActionFailure(payload)),
  resetCertificateState: () => dispatch(resetCertificateState()),
});

export const HomePageContainer = connect(null, mapDispatchToProps)(HomePage);

HomePage.propTypes = {
  retrieveCertificateByAction: PropTypes.func,
  resetCertificateState: PropTypes.func,
  retrieveCertificateByActionFailure: PropTypes.func,
};
