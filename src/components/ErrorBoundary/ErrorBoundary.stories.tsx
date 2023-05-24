import { createBrowserHistory } from "history";
import React, { FunctionComponent } from "react";
import { Router } from "react-router-dom";
import { ErrorBoundary } from "./ErrorBoundary";

const history = createBrowserHistory();

export default {
  title: "Error/ErrorBoundary",
  component: ErrorBoundary,
  parameters: {
    componentSubtitle: "Shown when child has errors.",
  },
};

const ErrorComponent: FunctionComponent = () => {
  throw new Error(
    "Error!! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  );
};

const MockFallbackComponent = () => <div>Fallback component</div>;

export const Default = () => {
  return (
    <Router history={history}>
      <ErrorBoundary
        FallbackComponent={MockFallbackComponent}
        onRecover={() => {}}
      >
        <ErrorComponent />
      </ErrorBoundary>
    </Router>
  );
};
