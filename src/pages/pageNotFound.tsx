import React from "react";
import { ErrorPage } from "../components/ErrorBoundary/ErrorPage";

export const PageNotFound = () => {
  return <ErrorPage title="404" description="Oops, page not found" />;
};
