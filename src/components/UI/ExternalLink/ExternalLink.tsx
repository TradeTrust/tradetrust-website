import React from "react";
import { makeEtherscanAddressURL, makeEtherscanTokenURL } from "../../../utils";

interface ExternalLinkProps {
  name: string;
  href: string;
}

interface ExternalLinkEtherscanAddressProps {
  name: string;
  address: string;
}

interface ExternalLinkEtherscanTokenProps {
  name: string;
  tokenRegistryAddress: string;
  tokenId: string;
}

export const ExternalLink = ({ name, href, ...props }: ExternalLinkProps) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {name}
    </a>
  );
};

export const ExternalLinkEtherscanAddress = ({ name, address, ...props }: ExternalLinkEtherscanAddressProps) => {
  const href = makeEtherscanAddressURL(address);

  return <ExternalLink name={name} href={href} {...props} />;
};

export const ExternalLinkEtherscanToken = ({
  name,
  tokenRegistryAddress,
  tokenId,
  ...props
}: ExternalLinkEtherscanTokenProps) => {
  const href = makeEtherscanTokenURL({ registryAddress: tokenRegistryAddress, tokenId });

  return <ExternalLink name={name} href={href} {...props} />;
};
