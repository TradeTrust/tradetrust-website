import { createBrowserHistory } from "history";
import React, { FunctionComponent } from "react";
import { Router } from "react-router-dom";
import { SentryErrorBoundary } from "./SentryErrorBoundary";

const history = createBrowserHistory();

export default {
  title: "Error/SentryErrorBoundary",
  component: SentryErrorBoundary,
  parameters: {
    componentSubtitle: "Shown when child has errors.",
  },
};

const ErrorComponent: FunctionComponent = () => {
  throw new Error("Some error occurred.");
};

export const Default = () => {
  return (
    <Router history={history}>
      <SentryErrorBoundary onRecover={() => {}}>
        <ErrorComponent />
      </SentryErrorBoundary>
    </Router>
  );
};
