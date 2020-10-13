import React from "react";
import { makeEtherscanAddressURL } from "../../../../utils";
import { ExternalLink } from "react-feather";

interface AddressBookTableRowProps {
  onAddressSelect: () => void;
  address: string;
  name: string;
  remarks?: string;
  className?: string;
}

export const AddressBookTableRow = ({
  className,
  onAddressSelect,
  address,
  name,
  remarks,
}: AddressBookTableRowProps) => {
  const addressHref = makeEtherscanAddressURL(address);

  return (
    <tr className={className} onClick={onAddressSelect} data-testid="table-row">
      <th>{name}</th>
      <td>{address}</td>
      {remarks && <td>{remarks}</td>}
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
    <tr data-testid="table-row">
      <th>&mdash;</th>
      <td>{message}</td>
    </tr>
  );
};
