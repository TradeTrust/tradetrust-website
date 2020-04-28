import React from "react";

interface ExternalLinkProps {
  name: string;
  href: string;
}

export const ExternalLink = ({ name, href, ...props }: ExternalLinkProps) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {name}
    </a>
  );
};
