import styled from "@emotion/styled";
import React, { useState } from "react";
import { X } from "react-feather";
import { NETWORK } from "../../../config";
import { vars } from "../../../styles";

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
        <div className="flex">
          <div className="w-auto ml-auto">
            <p className="mb-0">
              You are currently on <span className="network">{NETWORK}</span> network.
            </p>
          </div>
          <div className="w-auto ml-auto">
            <X onClick={() => setClose(true)} />
          </div>
        </div>
      </div>
    </NetworkWrap>
  );
};
