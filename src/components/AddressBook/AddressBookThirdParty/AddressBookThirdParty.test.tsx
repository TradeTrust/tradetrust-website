import { render, screen } from "@testing-library/react";
import React from "react";
import { AddressBookThirdParty } from "./AddressBookThirdParty";
import { AddressBookState } from "./../AddressBook";

const mockResults = [
  {
    identifier: "0x59308f96c98332ddd96a1308e1d29a7d4be00c6e",
    name: "Test Bank",
    remarks: "Added by Boon",
    source: "GovTech, Singapore",
  },
  {
    identifier: "0x57d897f67a816594aac7b7ba0dc80d4b94ada00c",
    name: "Atlantic Carrier",
    remarks: "Added by Marcus Ong",
    source: "IMDA, Singapore",
  },
];

describe("addressBookThirdParty", () => {
  it("should show default message", () => {
    render(
      <AddressBookThirdParty
        addressBookThirdPartyStatus={AddressBookState.NONE}
        onAddressSelect={() => {}}
        thirdPartyPageResults={[]}
        network="local"
      />
    );
    expect(screen.getByText("Try searching with keywords for results.")).not.toBeNull();
  });

  it("should show empty message", () => {
    render(
      <AddressBookThirdParty
        addressBookThirdPartyStatus={AddressBookState.EMPTY}
        onAddressSelect={() => {}}
        thirdPartyPageResults={[]}
        network="local"
      />
    );
    expect(screen.getByText("No address found. Try searching with another keyword for results.")).not.toBeNull();
  });

  it("should show 2 mock results", () => {
    render(
      <AddressBookThirdParty
        addressBookThirdPartyStatus={AddressBookState.SUCCESS}
        onAddressSelect={() => {}}
        thirdPartyPageResults={mockResults}
        network="local"
      />
    );
    expect(screen.getAllByTestId("table-row")).toHaveLength(2);
  });

  it("should show searching text", () => {
    render(
      <AddressBookThirdParty
        addressBookThirdPartyStatus={AddressBookState.PENDING}
        onAddressSelect={() => {}}
        thirdPartyPageResults={[]}
        network="local"
      />
    );
    expect(screen.getByText("Searching...")).not.toBeNull();
  });

  it("should show entityLookup error if feature does not exists", () => {
    render(
      <AddressBookThirdParty
        addressBookThirdPartyStatus={AddressBookState.ERROR}
        onAddressSelect={() => {}}
        thirdPartyPageResults={[]}
        network="local"
      />
    );
    expect(
      screen.getByText(
        "This address book’s endpoint does not have the entityLookup feature, do contact the respective personnel to set it up."
      )
    ).not.toBeNull();
  });
});
