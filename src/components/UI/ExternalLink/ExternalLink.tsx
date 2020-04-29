import React from "react";
import { makeEtherscanAddressURL } from "../../../utils";
// import { useAddressBook } from "../../../common/hooks/useAddressBook";

interface ExternalLinkProps {
  name: string;
  address: string;
}

export const ExternalLink = ({ name, address, ...props }: ExternalLinkProps) => {
  const href = makeEtherscanAddressURL(address);

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {name}
    </a>
  );
};
