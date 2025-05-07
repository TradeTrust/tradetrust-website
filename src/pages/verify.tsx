import React from "react";
import { Helmet } from "react-helmet";
import { HomePageContainer } from "../components/HomePageContent";
import { Page } from "../components/Layout/Page";
import { DropZoneSectionContainer } from "../components/VerifyPageContent/DropZoneSection";
import { NetworkSectionWithMetamask } from "../components/NetworkSection/NetworkSectionWithMetamask";

const VerifyPage = (): React.ReactElement => {
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
        <NetworkSectionWithMetamask subtitle="Verifying your document on" overlayMargin="ml-2" />

        <DropZoneSectionContainer />
        <HomePageContainer />
      </Page>
    </>
  );
};

export default VerifyPage;
