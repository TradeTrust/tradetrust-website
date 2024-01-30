import React from "react";
import { Helmet } from "react-helmet";
import { HomePageContainer } from "../components/HomePageContent";
import { DropZoneSectionContainer } from "../components/VerifyPageContent/DropZoneSection";
import { Page } from "../components/Layout/Page";
import { OverlayContent, OverlayContextProvider } from "@tradetrust-tt/tradetrust-ui-components";
import { NetworkSelect } from "../components/Layout/NetworkSelect";
import { InfoOverlay } from "../components/UI/Overlay";

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
        <div className="flex items-center">
          <div className="text-gray-900 mr-3" data-testid="page-subtitle">
            Verify your document on
          </div>
          <NetworkSelect />
          <OverlayContextProvider>
            <InfoOverlay className="p-0 ml-3 cursor-pointer focus:outline-none">
              <OverlayContent className="bg-white max-w-sm lg:max-w-md" title="Network Selector">
                A document can only be successfully verified on the same network where the document was created in.
                <br />
                If unsure, do check with the document issuer.
              </OverlayContent>
            </InfoOverlay>
          </OverlayContextProvider>
        </div>
        <DropZoneSectionContainer />
        <HomePageContainer />
      </Page>
    </>
  );
};

export default VerifyPage;
