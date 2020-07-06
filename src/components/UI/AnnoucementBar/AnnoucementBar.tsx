import React from "react";
import styled from "@emotion/styled";
import { vars } from "../../../styles";
import { SvgIcon, SvgIconFlag } from "./../../UI/SvgIcon";

export interface AnnoucementBarProps {
  className?: string;
  children: React.ReactNode;
}

export const AnnoucementBarUnStyled = ({ className, children }: AnnoucementBarProps) => {
  return (
    <div className={className}>
      <div className="row no-gutters align-items-center">
        <div className="col-auto mr-3">
          <div className="icon">
            <SvgIcon>
              <SvgIconFlag />
            </SvgIcon>
          </div>
        </div>
        <div className="col">{children}</div>
      </div>
    </div>
  );
};

export const AnnoucementBar = styled(AnnoucementBarUnStyled)`
  background-color: #5d6975;
  padding: 15px;
  border-radius: 3px;
  margin-bottom: 50px;
  color: ${vars.white};

  a {
    color: ${vars.white};
    &:hover {
      color: ${vars.greyLightest};
    }
  }
`;
