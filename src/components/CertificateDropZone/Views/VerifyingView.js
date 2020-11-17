import React from "react";
import { ViewerContainer } from "./SharedViewerStyledComponents";

export const VerifyingView = () => (
  <ViewerContainer className="text-blue">
    <i className="fas fa-spinner fa-pulse fa-3x" />
    <div className="m-4" style={{ fontSize: "1.5rem" }} data-testid="verifying-document">
      Verifying Document...
    </div>
  </ViewerContainer>
);
