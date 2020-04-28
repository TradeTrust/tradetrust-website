import React from "react";
import { AddressInfo } from "../../AddressInfo";
import { ExternalLink } from "../../UI/ExternalLink";
import { makeEtherscanAddressURL } from "../../../utils";
import { useAddressBook } from "../../../common/hooks/useAddressBook";

interface AssetTitleProps {
  role: string;
  address: string;
}

export const AssetTitle = ({ role, address }: AssetTitleProps) => {
  const addressHref = makeEtherscanAddressURL(address);
  const { getIdentifier } = useAddressBook();
  const name = address && getIdentifier(address);

  return (
    <div data-testid={role} className="py-3">
      <AddressInfo title={role} name={name}>
        <ExternalLink name={address} href={addressHref} />
      </AddressInfo>
    </div>
  );
};
