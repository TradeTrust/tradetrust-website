import React, { ReactElement } from "react";

interface SvgIconProps {
  className: string;
  children: ReactElement;
  handler?: ((event: any) => void) | undefined;
}

export const SvgIcon = ({ className, children, handler }: SvgIconProps): ReactElement => (
  <svg
    onClick={handler}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`feather ${className}`}
  >
    {children}
  </svg>
);
