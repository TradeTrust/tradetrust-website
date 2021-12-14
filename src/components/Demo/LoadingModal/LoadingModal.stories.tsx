import React from "react";
import { LoadingModal } from "./index";

export default {
  title: "UI/LoadingModal",
  component: LoadingModal,
  parameters: {
    componentSubtitle: "Types of loaders, with custom parameters.",
  },
};

export const LoadingModalDefault = () => {
  return (
    <LoadingModal
      title="Preparing..."
      content={
        <p>
          Please do not navigate out of this demo.
          <br />
          This process might take a while
        </p>
      }
    />
  );
};
