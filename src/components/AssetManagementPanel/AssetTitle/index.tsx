import React from "react";
import { useAddressResolved } from "../../../common/hooks/useAddressResolved";
import { AddressInfo } from "../../AddressInfo";

interface AssetTitleProps {
  role: string;
  address: string;
  children?: React.ReactNode;
}

export const AssetTitle = ({ role, address, children }: AssetTitleProps) => {
  const { getIdentifier } = useAddressResolved();
  const name = address && getIdentifier(address);

  return (
    <div data-testid={`asset-title-${role.toLowerCase()}`} className="py-3">
      <AddressInfo title={role} name={name}>
        {children}
      </AddressInfo>
    </div>
  );
};
