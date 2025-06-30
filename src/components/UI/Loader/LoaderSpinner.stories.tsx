import React, { ReactElement } from "react";
import { LoaderSpinner } from "./LoaderSpinner";

export default {
  title: "UI/Loader",
  component: LoaderSpinner,
  parameters: {
    componentSubtitle: "Types of loaders, with custom parameters.",
  },
};

export const Spinner = (): ReactElement => {
  return <LoaderSpinner />;
};

export const SpinnerCustomWidth = (): ReactElement => {
  return <LoaderSpinner width="90px" />;
};
