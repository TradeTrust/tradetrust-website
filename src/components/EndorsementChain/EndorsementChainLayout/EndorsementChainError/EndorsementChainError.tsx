import styled from "@emotion/styled";
import React, { FunctionComponent } from "react";
import { mixin, vars } from "../../../../styles";
import { SvgIcon, SvgIconArrowLeft } from "../../../UI/SvgIcon";

interface EndorsementChainErrorProps {
  error?: string;
  className?: string;
  setShowEndorsementChain: (payload: boolean) => void;
}

export const EndorsementChainErrorUnstyled: FunctionComponent<EndorsementChainErrorProps> = ({
  error,
  className,
  setShowEndorsementChain,
}) => {
  return (
    <div className={`container-custom ${className}`}>
      <div className="back-button" onClick={() => setShowEndorsementChain(false)} data-testid="back-button">
        <div className="row align-items-center no-gutters">
          <div className="col-auto mr-1">
            <SvgIcon>
              <SvgIconArrowLeft />
            </SvgIcon>
          </div>
          <div className="col-auto">
            <p className="mb-0">Back</p>
          </div>
        </div>
      </div>
      <div className="error-container">
        <div className="error-msg">
          There seem to be an error loading the endorsement chain, please try again later.
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
  }

  .error-msg {
    color: ${vars.red};
    ${mixin.fontSize(18)};
  }

  .back-button {
    color: ${vars.grey};
    cursor: pointer;
    margin-bottom: 10px;

    &[data-disabled="true"] {
      color: ${vars.greyLight};
      cursor: default;
    }
  }
`;
