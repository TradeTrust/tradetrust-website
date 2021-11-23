import React, { FunctionComponent } from "react";
import { ErrorBoundary } from "./ErrorBoundary";

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

export const Default = () => {
  return (
    <ErrorBoundary>
      <ErrorComponent />
    </ErrorBoundary>
  );
};
