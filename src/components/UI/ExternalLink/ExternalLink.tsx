import React, { FunctionComponent } from "react";
import { makeEtherscanAddressURL } from "../../../utils";

interface ExternalLinkProps {
  name: string;
  href: string;
}

interface ExternalLinkEtherscanAddressProps {
  name: string;
  address: string;
  className?: string;
}

export const ExternalLink: FunctionComponent<ExternalLinkProps> = ({ name, href, ...props }) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {name}
    </a>
  );
};

export const ExternalLinkEtherscanAddress: FunctionComponent<ExternalLinkEtherscanAddressProps> = ({
  name,
  address,
  ...props
}) => {
  const href = makeEtherscanAddressURL(address);

  return <ExternalLink name={name} href={href} {...props} />;
};
