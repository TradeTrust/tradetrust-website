import React from "react";
import { AddressInfo } from "../../AddressInfo";
import { ExternalLinkEtherscanAddress } from "../../UI/ExternalLink";
import { useIdentifierResolver } from "../../../common/hooks/useIdentifierResolver";

interface AssetTitleProps {
  role: string;
  address: string;
  children?: React.ReactNode;
}

export const TitleView = ({ role, address }: AssetTitleProps) => {
  const { resolvedIdentifier } = useIdentifierResolver(address);

  return (
    <div data-testid={role} className="py-3">
      <AddressInfo title={role} name={resolvedIdentifier}>
        <ExternalLinkEtherscanAddress name={address} address={address} />
      </AddressInfo>
    </div>
  );
};
