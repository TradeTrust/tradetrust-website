import React from "react";
import { Helmet } from "react-helmet";
import { ViewerPageContainer } from "../components/ViewerPageContainer";
import { NetworkSectionWithMetamask } from "../components/NetworkSection/NetworkSectionWithMetamask";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";

interface ViewerPageInterface {
  isMagicDemo?: boolean;
}
export const ViewerPage = (props: ViewerPageInterface): React.ReactElement => {
  const rootState = useSelector((state: RootState) => state);
  const document = rootState.certificate.rawModified;
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
        <div className="container">
          <NetworkSectionWithMetamask
            subtitle="Document verified on"
            overlayMargin="ml-3"
            disabled={true}
            document={document}
          />
        </div>
        <ViewerPageContainer {...props} />
      </div>
    </>
  );
};
