import React from "react";
import { Helmet } from "react-helmet";
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
      <ViewerPageContainer {...props} />
    </>
  );
};
