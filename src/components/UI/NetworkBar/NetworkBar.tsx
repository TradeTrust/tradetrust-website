import React, { useState } from "react";
import { NETWORK } from "../../../config";
import styled from "@emotion/styled";
import { vars } from "../../../styles";
import { SvgIcon, SvgIconX } from "../SvgIcon";

const NetworkWrap = styled.div`
  background-color: ${vars.greenDarker};
  color: ${vars.white};
  padding: 8px 0;

  .network {
    text-transform: capitalize;
  }

  svg {
    cursor: pointer;

    &:hover {
      color: ${vars.grey};
    }
  }
`;

export const NetworkBar = () => {
  const [close, setClose] = useState(false);

  if (close || NETWORK === "mainnet") return null;

  return (
    <NetworkWrap>
      <div className="container">
        <div className="row">
          <div className="col-auto ml-auto">
            <p className="mb-0">
              You are currently on <span className="network">{NETWORK}</span> network.
            </p>
          </div>
          <div className="col-auto ml-auto">
            <SvgIcon onClick={() => setClose(true)}>
              <SvgIconX />
            </SvgIcon>
          </div>
        </div>
      </div>
    </NetworkWrap>
  );
};
