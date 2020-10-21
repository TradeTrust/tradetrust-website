import React from "react";
import styled from "@emotion/styled";
import { mixin, vars } from "../../styles";
import { ResolutionResult } from "./../../common/hooks/useIdentifierResolver";

interface AddressInfoProps extends ResolutionResult {
  className?: string;
  title: string;
  children: React.ReactNode;
}

export const AddressInfoUnStyled = ({ className, title, name, resolvedBy, source, children }: AddressInfoProps) => {
  return (
    <div className={`${className}`}>
      <h6>{title}:</h6>
      {name && (
        <div className="d-flex">
          <h5>{name}</h5>
        </div>
      )}
      <div className="etherum-address">{children}</div>
      {resolvedBy && (
        <div className="d-flex">
          <span className="info">
            (Resolved by: {resolvedBy}
            {source && `; Source: ${source}`})
          </span>
        </div>
      )}
    </div>
  );
};

export const AddressInfo = styled(AddressInfoUnStyled)`
  h5,
  h6 {
    ${mixin.fontSourcesansproBold};
    margin-bottom: 0;
  }

  h5 {
    margin-bottom: 2px;
  }

  h6 {
    color: ${vars.grey};
    margin-bottom: 8px;
  }

  .info {
    font-size: ${mixin.fontSize(14)};
    color: ${vars.grey};
    ${mixin.fontSourcesansproSemibold};
  }

  .etherum-address {
    display: inline-block;
    word-break: break-all;
  }
`;
