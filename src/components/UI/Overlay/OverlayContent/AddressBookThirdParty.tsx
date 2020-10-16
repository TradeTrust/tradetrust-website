import React from "react";
import { AddressBookThirdPartyResultsProps } from "../../../../services/addressResolver";
import { isEmpty } from "lodash";
import { AddressBookTableRow, AddressBookTableRowEmpty } from "./AddressBookTableRow";

interface AddressBookThirdPartyProps {
  onAddressSelect: (address: string) => void;
  addressBookThirdPartyResults: AddressBookThirdPartyResultsProps[];
  isSearchingThirdParty: boolean;
}

export const AddressBookThirdParty = ({
  onAddressSelect,
  addressBookThirdPartyResults,
  isSearchingThirdParty,
}: AddressBookThirdPartyProps) => {
  return (
    <table className="table">
      <thead className="table-thead">
        <tr>
          <th>Name</th>
          <td>Address</td>
          <td>Source</td>
          <td>Remarks</td>
          <td>&nbsp;</td>
        </tr>
      </thead>
      <tbody className="table-tbody">
        {isSearchingThirdParty ? (
          <AddressBookTableRowEmpty message="Searching..." />
        ) : isEmpty(addressBookThirdPartyResults) ? (
          <AddressBookTableRowEmpty message="No address found. Try searching?" />
        ) : (
          addressBookThirdPartyResults.map((item, index) => {
            return (
              <AddressBookTableRow
                key={index}
                isLocal={false}
                onAddressSelect={() => {
                  onAddressSelect(item.identifier);
                }}
                address={item.identifier}
                name={item.name}
                source={item.source}
                remarks={item.remarks}
              />
            );
          })
        )}
      </tbody>
    </table>
  );
};
