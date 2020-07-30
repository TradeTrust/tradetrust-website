import React from "react";
import styled from "@emotion/styled";

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  return (
    <footer className={`${className} bg-white py-4`}>
      <div className="container-custom">
        <div className="row justify-content-center">
          <div className="col-auto">
            <p className="mb-0">Copyright &copy; 2020 TradeTrust</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const FooterDefault = styled(Footer)`
  @media print {
    display: none;
  }
`;
