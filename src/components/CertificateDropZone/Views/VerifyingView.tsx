import React from "react";
import { ViewerContainer } from "./SharedViewerStyledComponents";
import { LoaderSpinner } from "@govtechsg/tradetrust-ui-components";

export const VerifyingView = (): React.ReactElement => (
  <ViewerContainer className="text-cerulean-500 bg-white">
    <div className="mx-auto">
      <LoaderSpinner data-testid={"veriyfing-spinner"} width="50px" primary="#0099cc" />
    </div>
    <div className="m-4 text-2xl" data-testid="verifying-document">
      Verifying Document...
    </div>
  </ViewerContainer>
);
