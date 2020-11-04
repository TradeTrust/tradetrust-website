import React from "react";
import styled from "@emotion/styled";
import { mixin } from "../../styles";
import { AnchorLinkButtonSolidOrangeWhite } from "@govtechsg/tradetrust-ui-components";

interface RegisterButtonProps {
  className?: string;
  children: React.ReactNode;
  large?: boolean;
}

export const RegisterButtonUnStyled = ({ className, children }: RegisterButtonProps) => {
  return (
    <AnchorLinkButtonSolidOrangeWhite
      className={className}
      href="https://form.gov.sg/#!/5ef05be8e4f89f001195ef4c"
      target="_blank"
    >
      {children}
    </AnchorLinkButtonSolidOrangeWhite>
  );
};

export const RegisterButton = styled(RegisterButtonUnStyled)`
  /* one-off styling for this button */
  padding: 8px 24px 12px;
  ${mixin.fontSize(26)};
`;
