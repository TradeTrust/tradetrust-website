import React from "react";
import { Helmet } from "react-helmet";
import { DropZoneSectionContainer } from "../components/VerifyPageContent/DropZoneSection";
import { Page } from "../components/Layout/Page";
import { useProviderContext } from "../common/contexts/provider";
import { Link } from "react-router-dom";
import { ErrorPage } from "@govtechsg/tradetrust-ui-components";
import { NetworkSelect } from "../components/Layout/NetworkSelect";

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
          <span className="text-gray-900 mr-3 mb-3" data-testid="page-subtitle">
            Verify your document on
          </span>
          <NetworkSelect />
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
