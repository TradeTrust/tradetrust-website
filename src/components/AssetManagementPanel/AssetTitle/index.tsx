import React from "react";
import { AddressInfo } from "../../AddressInfo";
import { useIdentifierResolver } from "../../../common/hooks/useIdentifierResolver";

interface AssetTitleProps {
  role: string;
  address: string;
  children?: React.ReactNode;
}

export const AssetTitle = ({ role, address, children }: AssetTitleProps) => {
  const { resolvedIdentifier } = useIdentifierResolver(address);

  return (
    <div data-testid={`asset-title-${role.toLowerCase()}`} className="py-3">
      <AddressInfo title={role} name={resolvedIdentifier}>
        {children}
      </AddressInfo>
    </div>
  );
};
