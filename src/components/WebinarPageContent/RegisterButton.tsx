import React from "react";
import styled from "@emotion/styled";
import { mixin } from "../../styles";
import { AnchorLinkButtonSolidOrangeWhite } from "./../UI/Button";

interface RegisterButtonProps {
  className?: string;
  children: React.ReactNode;
}

export const RegisterButtonUnStyled = ({ className, children }: RegisterButtonProps) => {
  return (
    <AnchorLinkButtonSolidOrangeWhite
      className={className}
      href="https://form.gov.sg/#!/5ef05be8e4f89f001195ef4c"
      target="_blank"
      rel="noreferrer noopener"
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
