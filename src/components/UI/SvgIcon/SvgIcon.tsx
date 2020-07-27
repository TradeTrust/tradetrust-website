import _uniqueId from "lodash/uniqueId";
import React, { useState } from "react";
import ReactTooltip from "react-tooltip";

interface SvgIconProps extends React.SVGProps<SVGSVGElement> {
  tooltipId?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

interface TooltipIconProps {
  content: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  placement?: "top" | "right" | "bottom" | "left";
}

export const TooltipIcon = ({ content, children, className, placement = "right" }: TooltipIconProps) => {
  const [id] = useState(_uniqueId("tt-"));

  return (
    <>
      <SvgIcon tooltipId={id} className={className}>
        {children}
      </SvgIcon>
      <ReactTooltip
        id={`tooltip-${id}`}
        place={placement}
        type="dark"
        effect="solid"
        getContent={() => {
          return content;
        }}
      />
    </>
  );
};

export const SvgIconInfo = () => {
  return (
    <g className="info">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </g>
  );
};

export const SvgIconChecked = () => {
  return (
    <g className="check">
      <polyline points="20 6 9 17 4 12" />
    </g>
  );
};

export const SvgIconChervonLeft = () => {
  return (
    <g className="chevron-left">
      <polyline points="15 18 9 12 15 6" />
    </g>
  );
};

export const SvgIconEdit = () => {
  return (
    <g className="edit">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </g>
  );
};

export const SvgIconBook = () => {
  return (
    <g className="book">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </g>
  );
};

export const SvgIconX = () => {
  return (
    <g className="x">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </g>
  );
};

export const SvgIconFilePlus = () => {
  return (
    <g className="file-plus">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="12" y1="18" x2="12" y2="12" />
      <line x1="9" y1="15" x2="15" y2="15" />
    </g>
  );
};

export const SvgIconSearch = () => {
  return (
    <g className="search">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </g>
  );
};

export const SvgIconCheckCircle = () => {
  return (
    <g className="check-circle">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </g>
  );
};

export const SvgIconXCircle = () => {
  return (
    <g className="x-circle">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </g>
  );
};

export const SvgIconPrinter = () => {
  return (
    <g className="printer">
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
    </g>
  );
};

export const SvgIconEmail = () => {
  return (
    <g className="email">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </g>
  );
};

export const SvgIconDownload = () => {
  return (
    <g className="download">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </g>
  );
};

export const SvgIconArrowLeft = () => {
  return (
    <g className="arrow-left">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </g>
  );
};

export const SvgIconPlus = () => {
  return (
    <g className="plus">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </g>
  );
};

export const SvgIconEdit2 = () => {
  return (
    <g className="edit2">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </g>
  );
};

export const SvgIconSave = () => {
  return (
    <g className="save">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </g>
  );
};

export const SvgIconAlert = () => {
  return (
    <g className="alert">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <polyline points="12 9 12 13" />
      <polyline points="12 17 12.01 17" />
    </g>
  );
};

export const SvgIconTrash2 = () => {
  return (
    <g className="trash2">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </g>
  );
};

export const SvgIconPaperClip = () => {
  return (
    <g className="paperclip">
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </g>
  );
};

export const SvgIconFlag = () => {
  return (
    <g className="flag">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </g>
  );
};

export const SvgIconQRCode = () => {
  return (
    <g className="qrcode">
      <path d="M9 0H0V9H9V0ZM7.5 7.5H1.5V1.5H7.5V7.5Z" />
      <path d="M3 3H6V6H3V3Z" />
      <path d="M0 24H9V15H0V24ZM1.5 16.5H7.5V22.5H1.5V16.5Z" />
      <path d="M3 18H6V21H3V18Z" />
      <path d="M15 0V9H24V0H15ZM22.5 7.5H16.5V1.5H22.5V7.5Z" />
      <path d="M18 3H21V6H18V3Z" />
      <path d="M3 10.5H0V13.5H4.5V12H3V10.5Z" />
      <path d="M10.5 13.5H13.5V16.5H10.5V13.5Z" />
      <path d="M4.5 10.5H7.5V12H4.5V10.5Z" />
      <path d="M13.5 18H10.5V19.5H12V21H13.5V19.5V18Z" />
      <path d="M9 10.5V12H7.5V13.5H10.5V10.5H9Z" />
      <path d="M12 6H13.5V9H12V6Z" />
      <path d="M13.5 12V13.5H16.5V10.5H12V12H13.5Z" />
      <path d="M10.5 9H12V10.5H10.5V9Z" />
      <path d="M13.5 21H16.5V24H13.5V21Z" />
      <path d="M10.5 21H12V24H10.5V21Z" />
      <path d="M13.5 16.5H15V18H13.5V16.5Z" />
      <path d="M13.5 4.5V1.5H12V0H10.5V6H12V4.5H13.5Z" />
      <path d="M18 21H19.5V24H18V21Z" />
      <path d="M18 18H21V19.5H18V18Z" />
      <path d="M16.5 19.5H18V21H16.5V19.5Z" />
      <path d="M15 18H16.5V19.5H15V18Z" />
      <path d="M21 15V16.5H22.5V18H24V15H22.5H21Z" />
      <path d="M22.5 19.5H21V24H24V21H22.5V19.5Z" />
      <path d="M15 15V16.5H19.5V13.5H16.5V15H15Z" />
      <path d="M18 10.5V12H21V13.5H24V10.5H21H18Z" />
    </g>
  );
};

export const SvgIconExternalLink = () => {
  return (
    <g className="external-link">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </g>
  );
};

export const SvgIcon = ({ tooltipId, children, ...props }: SvgIconProps) => {
  const tooltipProps = tooltipId
    ? {
        "data-tip": "",
        "data-for": `tooltip-${tooltipId}`,
      }
    : null;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...tooltipProps}
      {...props}
    >
      {children}
    </svg>
  );
};
