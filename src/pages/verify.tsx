import { OverlayContent, OverlayContextProvider } from "@tradetrust-tt/tradetrust-ui-components";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import ConnectToMetamask from "../components/ConnectToMetamask";
import { HomePageContainer } from "../components/HomePageContent";
import { NetworkSelect } from "../components/Layout/NetworkSelect";
import { Page } from "../components/Layout/Page";
import { InfoOverlay } from "../components/UI/Overlay";
import { DropZoneSectionContainer } from "../components/VerifyPageContent/DropZoneSection";
import { resetCertificateState } from "../reducers/certificate";

const VerifyPage = (): React.ReactElement => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetCertificateState());
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
        {/* <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <div className="text-gray-900 mr-3" data-testid="page-subtitle">
              Verify your document on
            </div>
            <div className="flex">
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
          </div>
          <ConnectToMetamask />
        </div> */}
        <div className="flex flex-wrap md:flex-nowrap items-start md:items-center justify-between gap-2">
          <div className="flex flex-wrap md:flex-nowrap gap-2 w-full md:w-auto">
            <div className="w-full xs:w-auto text-gray-900 flex items-center" data-testid="page-subtitle">
              Verify your document on
            </div>
            <div className="w-full xs:w-auto flex flex-row items-center">
              <NetworkSelect />
              <OverlayContextProvider>
                <InfoOverlay className="p-0 ml-2 cursor-pointer focus:outline-none">
                  <OverlayContent className="bg-white max-w-sm lg:max-w-md" title="Network Selector">
                    A document can only be successfully verified on the same network where the document was created in.
                    <br />
                    If unsure, do check with the document issuer.
                  </OverlayContent>
                </InfoOverlay>
              </OverlayContextProvider>
            </div>
          </div>
          <ConnectToMetamask className="w-full xs:w-[18.25rem]" />
        </div>

        <DropZoneSectionContainer />
        <HomePageContainer />
      </Page>
    </>
  );
};

export default VerifyPage;
