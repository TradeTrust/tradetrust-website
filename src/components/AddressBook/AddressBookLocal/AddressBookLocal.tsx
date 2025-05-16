import { useAddressBook } from "@tradetrust-tt/address-identity-resolver";
import React, { FunctionComponent } from "react";
import { AddressBookState } from "./../AddressBook";
import { AddressBookTableRow, AddressBookTableRowEmpty } from "../AddressBookTableRow";

interface AddressBookLocalProps {
  addressBookLocalStatus: string;
  onAddressSelect?: (address: string) => void;
  localPageResults: string[];
  network?: string;
}

export const AddressBookLocal: FunctionComponent<AddressBookLocalProps> = ({
  addressBookLocalStatus,
  onAddressSelect,
  localPageResults,
  network,
}: AddressBookLocalProps) => {
  const { addressBook } = useAddressBook();

  return (
    <>
      <div className="w-full">
        <div className="hidden text-cloud-800 p-4 lg:flex">
          <h4 className="w-3/12">Name</h4>
          <h4 className="w-5/12">Address</h4>
        </div>
        {addressBookLocalStatus === AddressBookState.SUCCESS &&
          localPageResults.map((key) => {
            const identifier = addressBook[key];

            return (
              <AddressBookTableRow
                key={key}
                isLocal={true}
                onAddressSelect={() => {
                  if (!onAddressSelect) return;
                  onAddressSelect(key);
                }}
                address={key}
                name={identifier}
                network={network}
              />
            );
          })}
      </div>
      {addressBookLocalStatus === AddressBookState.NONE && (
        <AddressBookTableRowEmpty message="No address found. Try importing a csv template file?" />
      )}
      {addressBookLocalStatus === AddressBookState.EMPTY && (
        <AddressBookTableRowEmpty message="No address found. Try searching again?" />
      )}
    </>
  );
};
