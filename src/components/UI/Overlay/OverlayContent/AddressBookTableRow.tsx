import React from "react";
import { makeEtherscanAddressURL } from "../../../../utils";
import { ExternalLink } from "react-feather";

interface AddressBookTableRowProps {
  onAddressSelect: () => void;
  isLocal: boolean;
  address: string;
  name: string;
  source?: string;
  remarks?: string;
  className?: string;
}

export const AddressBookTableRow = ({
  className,
  onAddressSelect,
  isLocal,
  address,
  name,
  remarks,
  source,
}: AddressBookTableRowProps) => {
  const addressHref = makeEtherscanAddressURL(address);

  return (
    <tr className={className} onClick={onAddressSelect} data-testid="table-row">
      <th>{name}</th>
      <td>{address}</td>
      {!isLocal && (
        <>
          <td>{source ? source : "-"}</td>
          <td>{remarks ? remarks : "-"}</td>
        </>
      )}
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
