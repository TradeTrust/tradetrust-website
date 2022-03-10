import React from "react";
import { Helmet } from "react-helmet";
import { DropZoneSectionContainer } from "../components/VerifyPageContent/DropZoneSection";
import { Page } from "../components/Layout/Page";
import { useProviderContext } from "../common/contexts/provider";
import { Link } from "react-router-dom";
import { ErrorPage, OverlayContextProvider, Textual } from "@govtechsg/tradetrust-ui-components";
import { NetworkSelect } from "../components/Layout/NetworkSelect";
import { StaticOverlay } from "../components/UI/Overlay/StaticOverlay";

const VerifyPage = (): React.ReactElement => {
  const { getProvider } = useProviderContext();
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

      {getProvider() ? (
        <Page title="Verify Documents">
          <div className="flex items-center">
            <div className="text-gray-900 mr-3" data-testid="page-subtitle">
              Verify your document on
            </div>
            <NetworkSelect />
            <OverlayContextProvider>
              <StaticOverlay
                buttonText="?"
                className="w-6 h-6 rounded-full font-bold text-cerulean-200 border-1 border-cerulean-200 p-0 ml-3"
                style={{ borderColor: "#4BC3E9", padding: "0" }}
              >
                <Textual title="Network Selector">
                  A document can only be successfully verified on the same network where the document was created in.
                  <br />
                  If unsure, do check with the document issuer.
                </Textual>
              </StaticOverlay>
            </OverlayContextProvider>
          </div>
          <DropZoneSectionContainer />
        </Page>
      ) : (
        <ErrorPage
          pageTitle="Unsupported Network"
          header="You're currently on an unsupported network!"
          description="Please change to a supported network at the top of the page and try again."
          image="/static/images/errorpage/error-boundary.png"
        >
          <h3 className="font-normal my-2 sm:my-4 text-lg sm:text-2xl">
            <Link className="text-cerulean-200" to="/verify" onClick={() => window.location.reload()}>
              Try again
            </Link>
          </h3>
        </ErrorPage>
      )}
    </>
  );
};

export default VerifyPage;
