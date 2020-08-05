import React from "react";
import styled from "@emotion/styled";

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  return (
    <footer className={`deleted-content bg-white py-4`} />
  );
};

export const FooterDefault = styled(Footer)`
  @media print {
    display: none;
  }
`;
