import React from "react";
import { AddressInfo } from "../../AddressInfo";
import { useAddressBook } from "../../../common/hooks/useAddressBook";

interface AssetTitleProps {
  role: string;
  address: string;
  children?: React.ReactNode;
}

export const AssetTitle = ({ role, address, children }: AssetTitleProps) => {
  const { getIdentifier } = useAddressBook();
  const name = address && getIdentifier(address);

  return (
    <div data-testid={role} className="py-3">
      <AddressInfo title={role} name={name}>
        {children}
      </AddressInfo>
    </div>
  );
};
