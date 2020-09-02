import React from "react";
import styled from "@emotion/styled";
import { ViewerContainerStyles } from "./SharedViewerStyles";

const ViewerContainer = styled.div`
  ${ViewerContainerStyles()}
`;

export const VerifyingView = () => (
  <ViewerContainer className="bg-light text-blue">
    <i className="fas fa-spinner fa-pulse fa-3x" />
    <div className="m-3" style={{ fontSize: "1.5rem" }}>
      Verifying Document...
    </div>
  </ViewerContainer>
);
