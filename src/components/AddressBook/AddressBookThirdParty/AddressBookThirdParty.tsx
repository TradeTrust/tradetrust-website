import { AddressBookThirdPartyResultsProps } from "@tradetrust-tt/address-identity-resolver";
import React, { FunctionComponent } from "react";
import { AddressBookState } from "./../AddressBook";
import { AddressBookTableRow, AddressBookTableRowEmpty } from "../AddressBookTableRow";

interface AddressBookThirdPartyProps {
  addressBookThirdPartyStatus: string;
  onAddressSelect?: (address: string) => void;
  thirdPartyPageResults: AddressBookThirdPartyResultsProps[];
  network?: string;
}

export const AddressBookThirdParty: FunctionComponent<AddressBookThirdPartyProps> = ({
  addressBookThirdPartyStatus,
  onAddressSelect,
  thirdPartyPageResults,
  network,
}) => {
  return (
    <>
      <div className="w-full">
        <div className="hidden text-xl font-gilroy-bold text-cloud-800 p-4 lg:flex">
          <h4 className="w-3/12">Name</h4>
          <h4 className="w-5/12">Address</h4>
          <h4 className="w-3/12">Source</h4>
        </div>
        {addressBookThirdPartyStatus === AddressBookState.SUCCESS &&
          thirdPartyPageResults.map((item, index) => {
            return (
              <AddressBookTableRow
                key={index}
                isLocal={false}
                onAddressSelect={() => {
                  if (!onAddressSelect) return;
                  onAddressSelect(item.identifier);
                }}
                address={item.identifier}
                name={item.name}
                source={item.source}
                network={network}
              />
            );
          })}
      </div>
      {addressBookThirdPartyStatus === AddressBookState.ERROR && (
        <AddressBookTableRowEmpty message="This address book’s endpoint does not have the entityLookup feature, do contact the respective personnel to set it up." />
      )}
      {addressBookThirdPartyStatus === AddressBookState.NONE && (
        <AddressBookTableRowEmpty message="Try searching with keywords for results." />
      )}
      {addressBookThirdPartyStatus === AddressBookState.EMPTY && (
        <AddressBookTableRowEmpty message="No address found. Try searching with another keyword for results." />
      )}
      {addressBookThirdPartyStatus === AddressBookState.PENDING && <AddressBookTableRowEmpty message="Searching..." />}
    </>
  );
};
