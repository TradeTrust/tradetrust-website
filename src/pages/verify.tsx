import React from "react";
import { Helmet } from "react-helmet";
import { DropZoneSectionContainer } from "../components/VerifyPageContent/DropZoneSection";

const VerifyPage = (): React.ReactElement => {
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
      <DropZoneSectionContainer />
    </>
  );
};

export default VerifyPage;
