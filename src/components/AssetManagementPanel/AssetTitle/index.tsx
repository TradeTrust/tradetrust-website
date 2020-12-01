import { useIdentifierResolver } from "@govtechsg/address-identity-resolver";
import React from "react";
import { AddressInfo } from "../../AddressInfo";

interface AssetTitleProps {
  role: string;
  address: string;
  children?: React.ReactNode;
}

export const AssetTitle = ({ role, address, children }: AssetTitleProps) => {
  const { identityName, identityResolvedBy, identitySource } = useIdentifierResolver(address);

  return (
    <div data-testid={`asset-title-${role.toLowerCase()}`} className="py-4">
      <AddressInfo title={role} name={identityName} resolvedBy={identityResolvedBy} source={identitySource || ""}>
        {children}
      </AddressInfo>
    </div>
  );
};
