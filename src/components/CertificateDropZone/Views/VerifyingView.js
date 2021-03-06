import React from "react";
import { ViewerContainer } from "./SharedViewerStyledComponents";

export const VerifyingView = () => (
  <ViewerContainer className="text-blue bg-blue-300">
    <i className="fas fa-spinner fa-pulse fa-3x" />
    <div className="m-4 text-2xl" data-testid="verifying-document">
      Verifying Document...
    </div>
  </ViewerContainer>
);
