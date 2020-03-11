import React from "react";

interface AddressLinkProps {
  name: string;
  href: string;
}

export const AddressLink = ({ name, href }: AddressLinkProps) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {name}
    </a>
  );
};
