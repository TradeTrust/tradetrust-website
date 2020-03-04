import React, { ReactElement } from "react";

interface SvgIconProps {
  tooltipId?: string;
  cssClass: string;
  children: ReactElement;
  handler?: (event: any) => void;
}

const SvgIcon = ({ tooltipId, cssClass, children, handler }: SvgIconProps): ReactElement => (
  <svg
    data-tip
    data-for={`tooltip-${tooltipId}`}
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
    className={`feather ${cssClass}`}
  >
    {children}
  </svg>
);

export default SvgIcon;
