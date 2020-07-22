import styled from "@emotion/styled";
import React, { FunctionComponent } from "react";
import { vars } from "../../../../styles";
import { LoaderSpinner } from "../../../UI/Loader";

interface EndorsementChainLoadingProps {
  className?: string;
}

const EndorsementChainLoadingUnstyled: FunctionComponent<EndorsementChainLoadingProps> = ({ className }) => {
  return (
    <div className={`container-custom ${className}`}>
      <div className="loading-container">
        <LoaderSpinner className="loader" />
        <div>Please wait, loading endorsement chain.</div>
      </div>
    </div>
  );
};

export const EndorsementChainLoading = styled(EndorsementChainLoadingUnstyled)`
  .loading-container {
    display: flex;
    position: relative;
    height: 400px;
    align-items: center;
    justify-content: center;
  }

  .loader {
    height: 50px;
    width: 50px;
    border-top-color: ${vars.blue};
    border-bottom-color: ${vars.blueLight};
    border-right-color: ${vars.blueLight};
    border-left-color: ${vars.blueLight};
    position: absolute;
    top: 35%;
  }
`;
