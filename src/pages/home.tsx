import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import NavigationBar from "../components/Layout/NavigationBar";
import Footer from "../components/Layout/Footer";
import MainPageContainer from "../components/MainPageContainer";
import { connect } from "react-redux";
import {
  resetCertificateState,
  retrieveCertificateByAction,
  retrieveCertificateByActionFailure
} from "../reducers/certificate";

export const HomePage = props => {
  useEffect(() => {
    if (location) {
      props.resetCertificateState();
      console.log(props.location.search.substring(3));

      const action = JSON.parse(window.decodeURI(props.location.search.substring(3)));
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
      <NavigationBar active="home" />
      <MainPageContainer />
      <Footer />
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  retrieveCertificateByAction: payload => dispatch(retrieveCertificateByAction(payload)),
  retrieveCertificateByActionFailure: payload => dispatch(retrieveCertificateByActionFailure(payload)),
  resetCertificateState: () => dispatch(resetCertificateState())
});

export const HomePageContainer = connect(null, mapDispatchToProps)(HomePage);

HomePage.propTypes = {
  retrieveCertificateByAction: PropTypes.func,
  resetCertificateState: PropTypes.func,
  retrieveCertificateByActionFailure: PropTypes.func
};
