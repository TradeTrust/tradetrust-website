import React from "react";
import { AddressInfo } from "../../AddressInfo";
import { ExternalLinkEtherscanAddress } from "../../UI/ExternalLink";
import { useAddressBook } from "../../../common/hooks/useAddressBook";

interface TitleViewProps {
  role: string;
  address: string;
}

export const TitleView = ({ role, address }: TitleViewProps) => {
  const { getIdentifier } = useAddressBook();
  const name = address && getIdentifier(address);

  return (
    <div data-testid={role} className="py-3">
      <AddressInfo title={role} name={name}>
        <ExternalLinkEtherscanAddress name={address} address={address} />
      </AddressInfo>
    </div>
  );
};
