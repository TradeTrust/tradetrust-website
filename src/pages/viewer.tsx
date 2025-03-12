import { OverlayContent, OverlayContextProvider } from "@tradetrust-tt/tradetrust-ui-components";
import React from "react";
import { Helmet } from "react-helmet";
import ConnectToMetamask from "../components/ConnectToMetamask";
import { NetworkSelect } from "../components/Layout/NetworkSelect";
import { InfoOverlay } from "../components/UI/Overlay";
import { ViewerPageContainer } from "../components/ViewerPageContainer";

interface ViewerPageInterface {
  isMagicDemo?: boolean;
}
export const ViewerPage = (props: ViewerPageInterface): React.ReactElement => {
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
        <meta property="og:title" content="TradeTrust - Viewer" />
        <meta property="og:url" content={`${window.location.origin}/viewer`} />
        <title>TradeTrust - Viewer</title>
        <meta
          name="keywords"
          content="Blockchain, NFT, Ethereum, Electronic Trade Document, Digital Trade Document, Transferable Documents, Electronic Bill of Lading, Bill of Lading, Verifiable Document, Certificate of Origin"
        />
      </Helmet>

      <div className="flex flex-col py-12">
        <div className="container">
          <h2 className="text-cloud-800 max-w-3xl">Verify Documents</h2>
        </div>
        <div className="container flex flex-col xs:flex-row flex-wrap md:flex-nowrap items-start md:items-center justify-between gap-2">
          <div className="flex flex-wrap md:flex-nowrap gap-2 w-full md:w-auto">
            <div className="w-full xs:w-auto text-gray-900 flex items-center" data-testid="page-subtitle">
              Document verified on
            </div>
            <div className="w-full xs:w-auto flex flex-row items-center">
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
          <ConnectToMetamask className="w-full xs:w-[18.25rem]" />
        </div>
        <ViewerPageContainer {...props} />
      </div>
    </>
  );
};
