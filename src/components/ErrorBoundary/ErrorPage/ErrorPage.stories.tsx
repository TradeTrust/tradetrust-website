import React from "react";
import { ErrorPage } from "./ErrorPage";

export default {
  title: "Error/ErrorPage",
  component: ErrorPage,
  parameters: {
    componentSubtitle: "General error page",
  },
};

export const Default = () => {
  return <ErrorPage title="ERROR!!" description="Something went wrong!" />;
};
