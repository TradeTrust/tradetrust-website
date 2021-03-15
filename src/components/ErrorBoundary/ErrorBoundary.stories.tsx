import { createBrowserHistory } from "history";
import React from "react";
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

const ChildSuccess = () => {
  return <p>success</p>;
};

const ChildErrored = () => {
  throw "Error thrown from child";
};

export const Default = () => {
  return (
    <Router history={history}>
      <ErrorBoundary>
        <ChildSuccess />
      </ErrorBoundary>
    </Router>
  );
};

export const Error = () => {
  return (
    <Router history={history}>
      <ErrorBoundary>
        <ChildErrored />
      </ErrorBoundary>
    </Router>
  );
};
