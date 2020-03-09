import React, { ReactElement } from "react";

interface SvgIconProps {
  cssClass: string;
  tooltipId?: string;
  children: ReactElement;
  handler?: (event: any) => void;
}

export const SvgIconInfo = () => {
  return (
    <>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </>
  );
};

export const SvgIconChecked = () => {
  return <polyline points="20 6 9 17 4 12" />;
};

export const SvgIconChervonLeft = () => {
  return <polyline points="15 18 9 12 15 6" />;
};

export const SvgIconEdit = () => {
  return (
    <>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </>
  );
};

export const SvgIcon = ({ tooltipId, cssClass = "", children, handler }: SvgIconProps) => {
  return (
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
};
