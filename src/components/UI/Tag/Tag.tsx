import styled from "@emotion/styled";
import { mixin, vars } from "../../../styles";

const TagBaseStyle = () => {
  return `
    display: inline-block;
    letter-spacing: 0.01rem;
    border-radius: 4px;
    margin-right: 8px;
    margin-bottom: 8px;
    padding: 2px 10px;

    background-color: ${vars.grey};
    color: ${vars.white};

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

export const TagSolid = styled.div`
  ${TagBaseStyle()};
`;

export const TagSolidTeal = styled.div`
  ${TagBaseStyle()};

  background-color: ${vars.teal};
  color: ${vars.white};
`;

export const TagSolidOrange = styled.div`
  ${TagBaseStyle()};

  background-color: ${vars.brandOrange};
  color: ${vars.white};
`;

const TagBorderedBaseStyle = () => {
  return `
    ${TagBaseStyle()};

    padding: 0 6px;
    background-color: ${vars.white};
    color: ${vars.grey};

    border-color: ${vars.grey};
    border-style: solid;
    border-width: 2px;
  `;
};

export const TagBordered = styled.div`
  ${TagBorderedBaseStyle()};
`;

export const TagBorderedRed = styled.div`
  ${TagBorderedBaseStyle()};

  color: ${vars.red};
  border-color: ${vars.red};
`;

export const TagBorderedRedLarge = styled.div`
  ${TagBorderedBaseStyle()};

  color: ${vars.red};
  border-color: ${vars.red};

  padding: 0 16px;
  border-width: 3px;
  ${mixin.fontSize(40)};
  margin: 0;
`;
