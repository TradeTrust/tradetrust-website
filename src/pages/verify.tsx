import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { HomePageContainer } from "../components/HomePageContent";
import { Page } from "../components/Layout/Page";
import { DropZoneSectionContainer } from "../components/VerifyPageContent/DropZoneSection";
import { useDispatch } from "react-redux";
import { reset } from "../reducers/sample";
import { useLocation } from "react-router-dom";

const VerifyPage = (): React.ReactElement => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const { search } = location;
    const params = new URLSearchParams(search);
    const query = params.get("q");
    // reset redux state on page load, this is to prevent demo state from previous load
    if (!query) {
      dispatch(reset());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <meta
          property="description"
          content="TradeTrust lets you verify documents from any issuer. All in one place."
        />
        <meta
          property="og:description"
          content="TradeTrust lets you verify documents from any issuer. All in one place."
        />
        <meta property="og:title" content="TradeTrust - Verify Your Document" />
        <meta property="og:url" content={`${window.location.origin}`} />
        <title>TradeTrust - Verify Your Document</title>
        <meta
          name="keywords"
          content="Blockchain, NFT, Ethereum, Electronic Trade Document, Verifiable Document, Digital Trade Document, Transferable Documents, Verify Document"
        />
      </Helmet>

      <Page title="Verify Documents">
        <DropZoneSectionContainer />
        <HomePageContainer />
      </Page>
    </>
  );
};

export default VerifyPage;
