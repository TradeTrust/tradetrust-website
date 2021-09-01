import React from "react";
import { sharedViewer } from "./DefaultView";
import { LoaderSpinner } from "@govtechsg/tradetrust-ui-components";

export const VerifyingView = (): React.ReactElement => (
  <div className={`${sharedViewer}`}>
    <div className="mx-auto">
      <LoaderSpinner data-testid={"veriyfing-spinner"} width="50px" primary="#0099cc" />
    </div>
    <div className="m-4 text-2xl" data-testid="verifying-document">
      Verifying Document...
    </div>
  </div>
);
