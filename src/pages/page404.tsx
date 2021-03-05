import React from "react";
import { ErrorPage } from "../components/ErrorBoundary/ErrorPage";

export const Page404 = () => {
  return <ErrorPage title="404" description="Oops, page not found" />;
};
