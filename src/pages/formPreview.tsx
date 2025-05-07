import React from "react";
import { Helmet } from "react-helmet";
import { FormPreviewLanding } from "../components/Creator/FormPreview";

const FormPreviewPage = (): React.ReactElement => {
  return (
    <>
      <Helmet>
        <meta property="description" content="TradeTrust Creator lets you create documents." />
        <meta property="og:description" content="TradeTrust Creator lets you create documents." />
        <meta property="og:title" content="TradeTrust - Create Your Document" />
        <meta property="og:url" content={`${window.location.origin}`} />
        <title>TradeTrust - Create Your Document</title>
        <meta
          name="keywords"
          content="Blockchain, NFT, Ethereum, Electronic Trade Document, Verifiable Document, Digital Trade Document, Transferable Documents, Verify Document"
        />
      </Helmet>

      <FormPreviewLanding />
    </>
  );
};

export default FormPreviewPage;
