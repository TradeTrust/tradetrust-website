// import { ErrorPage } from "../components/ErrorBoundary/ErrorPage";
import { ErrorPage } from "@govtechsg/tradetrust-ui-components";
import React from "react";

export const PageNotFound = () => {
  return <ErrorPage title="404" description="Oops, page not found" />;
};
