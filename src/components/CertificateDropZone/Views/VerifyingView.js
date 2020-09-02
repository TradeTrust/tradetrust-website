import React from "react";
import { ViewerContainer } from "./SharedViewerStyledComponents";

export const VerifyingView = () => (
  <ViewerContainer className="bg-light text-blue">
    <i className="fas fa-spinner fa-pulse fa-3x" />
    <div className="m-3" style={{ fontSize: "1.5rem" }}>
      Verifying Document...
    </div>
  </ViewerContainer>
);
