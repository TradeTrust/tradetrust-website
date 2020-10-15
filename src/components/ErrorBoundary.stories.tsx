import React from "react";
import { ErrorBoundary } from "./ErrorBoundary";

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
    <ErrorBoundary>
      <ChildSuccess />
    </ErrorBoundary>
  );
};

export const Error = () => {
  return (
    <ErrorBoundary>
      <ChildErrored />
    </ErrorBoundary>
  );
};
