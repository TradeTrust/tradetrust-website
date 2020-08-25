import React from "react";
import styled from "@emotion/styled";
import { mixin, vars } from "../../styles";

interface AddressInfoProps {
  className?: string;
  title: string;
  name: string;
  source?: string;
  children: React.ReactNode;
}

export const AddressInfoUnStyled = ({ className, title, name, source, children }: AddressInfoProps) => {
  return (
    <div className={`${className}`}>
      <h6>{title}:</h6>
      {name && (
        <div className="d-flex">
          <h5>{name}</h5>
          {source && <span className="source-text">(Source: {source})</span>}
        </div>
      )}
      <div className="etherum-address">{children}</div>
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

  .source-text {
    margin-left: 8px;
    color: ${vars.grey};
    ${mixin.fontSourcesansproBold};
  }

  .etherum-address {
    display: inline-block;
    word-break: break-all;
  }
`;
