import React from "react";
import { FormPreviewLanding } from "../components/Creator/FormPreview";
import { Page } from "../components/Layout/Page";
import { MetaMaskPopup } from "../components/MetamaskPopupMessage";

const FormPreviewPage = (): React.ReactElement => {
  return (
    <Page title="Create Document">
      <MetaMaskPopup />
      <FormPreviewLanding />
    </Page>
  );
};

export default FormPreviewPage;
