import React from "react";
import styled from "@emotion/styled";
import { mixin, vars } from "../../../styles";
import { NavLink } from "react-router-dom";
import { baseStyleButton } from "@govtechsg/tradetrust-ui-components";

interface ReactRouterLinkProps {
  className?: string;
  children?: React.ReactNode;
  to: string;
  large?: boolean;
}

export const ReactRouterLink = ({ className, children, to }: ReactRouterLinkProps) => {
  return (
    <NavLink className={className} to={to}>
      {children}
    </NavLink>
  );
};

export const ReactRouterLinkButtonSolidOrangeWhite = styled(ReactRouterLink)`
  ${baseStyleButton({
    bgColor: vars.brandOrange,
    textColor: vars.white,
  })} :hover {
    text-decoration: none;
    color: ${vars.white};
  }

  ${(props) => (props.large ? `${mixin.buttonLarge()}; ` : ``)};
`;

export const ReactRouterLinkButtonSolidNavyWhite = styled(ReactRouterLink)`
  ${baseStyleButton({
    bgColor: vars.brandNavy,
    textColor: vars.white,
  })} :hover {
    text-decoration: none;
    color: ${vars.white};
  }

  ${(props) => (props.large ? `${mixin.buttonLarge()}; ` : ``)};
`;
