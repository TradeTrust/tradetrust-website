import { useAddressBook } from "@govtechsg/address-identity-resolver";
import { isEmpty } from "lodash";
import React from "react";
import { AddressBookTableRow, AddressBookTableRowEmpty } from "./AddressBookTableRow";

interface AddressBookLocalProps {
  onAddressSelect: (address: string) => void;
  searchTerm: string;
}

export const AddressBookLocal = ({ onAddressSelect, searchTerm }: AddressBookLocalProps) => {
  const { addressBook } = useAddressBook();
  const filteredAddresses = Object.keys(addressBook).filter((key) => {
    const identifier = addressBook[key];
    return (
      identifier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      key.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <table className="table">
      <thead className="table-thead">
        <tr>
          <th>Name</th>
          <td>Address</td>
          <td>&nbsp;</td>
        </tr>
      </thead>
      <tbody className="table-tbody">
        {isEmpty(addressBook) ? (
          <AddressBookTableRowEmpty message="No address found. Try importing a csv template file?" />
        ) : filteredAddresses.length === 0 ? (
          <AddressBookTableRowEmpty message="No address found." />
        ) : (
          filteredAddresses.map((key) => {
            const identifier = addressBook[key];

            return (
              <AddressBookTableRow
                key={key}
                isLocal={true}
                onAddressSelect={() => {
                  onAddressSelect(key);
                }}
                address={key}
                name={identifier}
              />
            );
          })
        )}
      </tbody>
    </table>
  );
};
