import React from "react";
import { FormPreviewLanding } from "../components/Creator/FormPreview";
import { Page } from "../components/Layout/Page";

const FormPreviewPage = (): React.ReactElement => {
  return (
    <Page title="Create Document">
      <FormPreviewLanding />
    </Page>
  );
};

export default FormPreviewPage;
