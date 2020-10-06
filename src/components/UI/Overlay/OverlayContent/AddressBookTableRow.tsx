import React from "react";
import { makeEtherscanAddressURL } from "../../../../utils";
import { ExternalLink } from "react-feather";

interface AddressBookTableRowProps {
  onAddressSelect: () => void;
  address: string;
  name: string;
  className?: string;
}

export const AddressBookTableRow = ({ className, onAddressSelect, address, name }: AddressBookTableRowProps) => {
  const addressHref = makeEtherscanAddressURL(address);

  return (
    <tr className={className} onClick={onAddressSelect}>
      <th>{name}</th>
      <td>{address}</td>
      <td>
        <a href={addressHref} target="_blank" rel="noreferrer noopener">
          <ExternalLink />
        </a>
      </td>
    </tr>
  );
};

interface AddressBookTableRowEmptyProps {
  message: string;
}

export const AddressBookTableRowEmpty = ({ message }: AddressBookTableRowEmptyProps) => {
  return (
    <tr>
      <th>&mdash;</th>
      <td>{message}</td>
      <td>&nbsp;</td>
    </tr>
  );
};
