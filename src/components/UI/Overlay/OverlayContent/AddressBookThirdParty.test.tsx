import React from "react";
import { render, screen } from "@testing-library/react";
import { AddressBookThirdParty } from "./AddressBookThirdParty";

const mockResults = [
  {
    identifier: "0x59308f96c98332ddd96a1308e1d29a7d4be00c6e",
    name: "Test Bank",
    remarks: "Added by Boon",
  },
  {
    identifier: "0x57d897f67a816594aac7b7ba0dc80d4b94ada00c",
    name: "Atlantic Carrier",
    remarks: "Added by Marcus Ong",
  },
];

describe("AddressBookThirdParty", () => {
  it("should show default message", () => {
    render(
      <AddressBookThirdParty
        onAddressSelect={() => {}}
        addressBookThirdPartyResults={[]}
        isSearchingThirdParty={false}
      />
    );
    expect(screen.getByText("No address found. Try searching?")).not.toBeNull();
  });

  it("should show 2 mock results", () => {
    render(
      <AddressBookThirdParty
        onAddressSelect={() => {}}
        addressBookThirdPartyResults={mockResults}
        isSearchingThirdParty={false}
      />
    );
    expect(screen.getAllByTestId("table-row")).toHaveLength(2);
  });

  it("should show searching text", () => {
    render(
      <AddressBookThirdParty
        onAddressSelect={() => {}}
        addressBookThirdPartyResults={[]}
        isSearchingThirdParty={true}
      />
    );
    expect(screen.getByText("Searching...")).not.toBeNull();
  });
});
