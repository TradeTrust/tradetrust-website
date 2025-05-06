import React, { FunctionComponent } from "react";
import { Redirect } from "react-router";
import { useConfigContext } from "../common/contexts/ConfigContext";
import { DynamicFormLayout } from "../components/DynamicFormContainer/DynamicFormLayout";
import { Page } from "../components/Layout/Page";

export const DynamicFormPage: FunctionComponent = () => {
  const { config } = useConfigContext();
  if (!config) {
    return <Redirect to="/creator" />;
  }

  return (
    <Page title="Create Document">
      <DynamicFormLayout />
    </Page>
  );
};
