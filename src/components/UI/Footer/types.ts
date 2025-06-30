import React from "react";
export interface FooterColumnData extends FooterColumnItem {
  render?: (props: FooterColumnItemProps) => React.ReactElement;
}

export interface FooterColumnItemProps extends FooterColumnItem {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface FooterColumnItem {
  label: string;
  to: string;
}

export interface FooterColumnProps {
  category: string;
  items: FooterColumnData[];
}

export interface legalDataProps {
  copyright: string | React.ReactElement;
  items: FooterColumnData[];
}
export interface FooterProps {
  className?: string;
  title?: string;
  logoUrl?: string;
  data?: FooterColumnProps[];
  legalData?: legalDataProps;
}
