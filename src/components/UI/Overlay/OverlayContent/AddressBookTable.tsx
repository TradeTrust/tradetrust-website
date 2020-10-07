import React from "react";
import { AddressBookDropdownProps, AddressBookThirdPartyProps } from "./AddressBook";
import { AddressBookLocalProps } from "../../../../common/hooks/useAddressBook";
import { isEmpty } from "lodash";
import { AddressBookTableRow, AddressBookTableRowEmpty } from "./AddressBookTableRow";

interface AddressBookTableProps {
  addressBookDropdown: AddressBookDropdownProps;
  addressBookLocal: AddressBookLocalProps;
  addressBookThirdParty: AddressBookThirdPartyProps[];
  searchTerm: string;
  onAddressSelect: (address: string) => void;
}

export const AddressBookTable = ({
  addressBookDropdown,
  addressBookLocal,
  addressBookThirdParty,
  searchTerm,
  onAddressSelect,
}: AddressBookTableProps) => {
  return (
    <div className="table-responsive">
      <table className="table">
        <thead className="table-thead">
          {addressBookDropdown.name === "Local" ? (
            <tr>
              <th>Name</th>
              <td>Address</td>
              <td>&nbsp;</td>
            </tr>
          ) : (
            <tr>
              <th>Name</th>
              <td>Address</td>
              <td>Remarks</td>
              <td>&nbsp;</td>
            </tr>
          )}
        </thead>
        <tbody className="table-tbody">
          {addressBookDropdown.name === "Local" ? (
            isEmpty(addressBookLocal) ? (
              <AddressBookTableRowEmpty message="No address found. Try importing a csv template file?" />
            ) : (
              Object.keys(addressBookLocal).map((key) => {
                const name = addressBookLocal[key];
                const address = key;

                const searchTermLowerCase = searchTerm.toLowerCase();
                const nameLowerCase = name.toLowerCase();
                const addressLowerCase = address.toLowerCase();

                return (
                  <AddressBookTableRow
                    key={key}
                    onAddressSelect={() => {
                      onAddressSelect(address);
                    }}
                    address={address}
                    name={name}
                    className={
                      nameLowerCase.includes(searchTermLowerCase) || addressLowerCase.includes(searchTermLowerCase)
                        ? ""
                        : "d-none"
                    }
                  />
                );
              })
            )
          ) : isEmpty(addressBookThirdParty) ? (
            <AddressBookTableRowEmpty message="No address found. Try searching?" />
          ) : (
            addressBookThirdParty.map((item, index) => {
              return (
                <AddressBookTableRow
                  key={index}
                  onAddressSelect={() => {
                    onAddressSelect(item.identifier);
                  }}
                  address={item.identifier}
                  name={item.name}
                  remarks={item.remarks}
                />
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};
