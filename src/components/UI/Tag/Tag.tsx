import React from "react";
import styled from "@emotion/styled";
import { mixin, vars } from "../../../styles";

interface TagProps {
  className?: string;
  children: string;
}

export const TagUnstyled = ({ className, children }: TagProps) => {
  return <div className={className}>{children}</div>;
};

const TagBaseStyle = () => {
  return `
    display: inline-block;
    letter-spacing: 0.01rem;
    border-radius: 4px;
    margin-right: 8px;
    margin-bottom: 8px;

    ${mixin.fontSourcesansproBold()};
    ${mixin.fontSize(18)};

    &:last-of-type {
      margin-right: 0;
    }

    p {
      margin-top: 0;
      margin-bottom: 0;
    }
  `;
};

export const TagSolid = styled(TagUnstyled)`
  ${TagBaseStyle()};

  background-color: ${vars.teal};
  color: ${vars.white};
  padding: 2px 10px;
`;

export const TagBordered = styled(TagUnstyled)`
  ${TagBaseStyle()};

  background-color: ${vars.white};
  color: ${vars.grey};
  padding: 0 6px;

  border-style: solid;
  border-width: 2px;
  border-color: ${vars.grey};
`;

export const TagBorderedSurrendered = styled(TagUnstyled)`
  ${TagBaseStyle()};

  background-color: ${vars.white};
  color: ${vars.red};
  padding: 0 16px;

  border-style: solid;
  border-width: 3px;
  border-color: ${vars.red};

  ${mixin.fontSize(40)};
  margin: 0;
`;
