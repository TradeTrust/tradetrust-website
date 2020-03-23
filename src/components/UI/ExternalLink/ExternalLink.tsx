import React from "react";

interface ExternalLinkProps {
  name: string;
  href: string;
}

export const ExternalLink = ({ name, href }: ExternalLinkProps) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {name}
    </a>
  );
};
