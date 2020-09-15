import styled from "@emotion/styled";
import React, { FunctionComponent } from "react";
import { mixin, vars } from "../../../../styles";
import { AlertTriangle } from "react-feather";

interface EndorsementChainErrorProps {
  error?: string;
  className?: string;
}

export const EndorsementChainErrorUnstyled: FunctionComponent<EndorsementChainErrorProps> = ({ error, className }) => {
  return (
    <div className={`${className}`}>
      <div className="error-container">
        <div className="fixed-error-row">
          <AlertTriangle className="alert-icon mr-2" color={`${vars.red}`} />
          <div className="error-msg">An error occured, please try again later.</div>
        </div>
        <div className="error-msg">{error}</div>
      </div>
    </div>
  );
};

export const EndorsementChainError = styled(EndorsementChainErrorUnstyled)`
  .error-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 300px;
    flex-direction: column;
    background-color: ${vars.white};
  }

  .fixed-error-row {
    display: flex;
  }

  .error-msg {
    color: ${vars.greyDark};
    font-weight: bold;
    ${mixin.fontSize(18)};
  }
`;
