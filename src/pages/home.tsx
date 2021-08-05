declare const window: any;
import React, { FunctionComponent, useEffect } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import queryString from "query-string";
import { MainPageContainer } from "../components/MainPageContainer";
import { connect } from "react-redux";
import {
  resetCertificateState,
  retrieveCertificateByAction,
  retrieveCertificateByActionFailure,
  updateCertificate,
} from "../reducers/certificate";

export const HomePage: FunctionComponent = (props: any) => {
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
  useEffect(() => {
    // https://web.dev/file-handling/
    // https://web.dev/deprecating-excalidraw-electron/
    // https://developer.mozilla.org/en-US/docs/Web/API/FileSystemFileHandle
    // https://developer.mozilla.org/en-US/docs/Web/API/Blob/text
    if ("launchQueue" in window) {
      window.launchQueue.setConsumer(async (launchParams: any) => {
        // Nothing to do when the queue is empty.
        if (!launchParams.files.length) {
          return;
        }
        for (const fileHandle of launchParams.files) {
          try {
            const fileData = await fileHandle.getFile();
            const text = await fileData.text();
            props.updateCertificate(JSON.parse(text));
          } catch (e) {
            console.error(e);
          }
        }
      });
    }
  }, [props]);
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="TradeTrust lets you verify the documents you have of anyone from any issuer. All in one place."
        />
        <meta
          property="og:description"
          content="TradeTrust lets you verify the documents you have of anyone from any issuer. All in one place."
        />
        <meta property="og:title" content="TradeTrust - An easy way to check and verify your documents" />
        <meta property="og:url" content={`${window.location.origin}`} />
        <title>TradeTrust - An easy way to check and verify your documents</title>
      </Helmet>
      <MainPageContainer />
    </>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  retrieveCertificateByAction: (payload: any) => dispatch(retrieveCertificateByAction(payload)),
  retrieveCertificateByActionFailure: (payload: any) => dispatch(retrieveCertificateByActionFailure(payload)),
  resetCertificateState: () => dispatch(resetCertificateState()),
  updateCertificate: (payload: any) => dispatch(updateCertificate(payload)),
});

export const HomePageContainer = connect(null, mapDispatchToProps)(HomePage);

HomePage.propTypes = {
  retrieveCertificateByAction: PropTypes.func,
  resetCertificateState: PropTypes.func,
  retrieveCertificateByActionFailure: PropTypes.func,
  updateCertificate: PropTypes.func,
};
