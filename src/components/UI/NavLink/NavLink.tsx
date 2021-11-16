import { useRouter } from "next/dist/client/router";
import Link, { LinkProps } from "next/link";
import React, { Children, FunctionComponent, ReactChild, ReactChildren, ReactNode } from "react";

interface NavLinkProps {
  children: ReactNode;
  activeClassName?: string;
}

export const NavLink: FunctionComponent<NavLinkProps & LinkProps> = ({ children, activeClassName = "", ...props }) => {
  const { asPath } = useRouter();
  const child = Children.only(children);
  const isValidChild = React.isValidElement(child);

  let childClassName = "";

  if (isValidChild && child.props.className) {
    childClassName = child.props.className;
  }

  const className =
    asPath === props.href || asPath === props.as ? `${childClassName} ${activeClassName}`.trim() : childClassName;

  return (
    <Link {...props}>
      {isValidChild
        ? React.cloneElement(child, {
            className: className || null,
          })
        : null}
    </Link>
  );
};
