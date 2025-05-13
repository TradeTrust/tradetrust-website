import { useAddressBook } from "@tradetrust-tt/address-identity-resolver";
import { render, screen } from "@testing-library/react";
import React from "react";
import { AddressBookLocal } from "./AddressBookLocal";
import { AddressBookState } from "./../AddressBook";

jest.mock("@tradetrust-tt/address-identity-resolver", () => ({
  useAddressBook: jest.fn(),
}));

const mockUseAddressBook = useAddressBook as jest.Mock;

const addressBook = {
  "0xe94e4f16ad40adc90c29dc85b42f1213e034947c": "Bank of China",
  "0xa61b056da0084a5f391ec137583073096880c2e3": "DBS",
  "0x1d350495b4c2a51fbf1c9dedadeab288250c703e": "China Oil",
  "0x28f7ab32c521d13f2e6980d072ca7ca493020145": "Standard Chartered",
};
const localPageResults = [
  "0xe94e4f16ad40adc90c29dc85b42f1213e034947c",
  "0xa61b056da0084a5f391ec137583073096880c2e3",
  "0x1d350495b4c2a51fbf1c9dedadeab288250c703e",
  "0x28f7ab32c521d13f2e6980d072ca7ca493020145",
];

describe("addressBookLocal", () => {
  it("should show default message", () => {
    mockUseAddressBook.mockReturnValue({ addressBook: {} });
    render(
      <AddressBookLocal
        addressBookLocalStatus={AddressBookState.NONE}
        onAddressSelect={() => {}}
        localPageResults={[]}
        network="local"
      />
    );
    expect(screen.getByText("No address found. Try importing a csv template file?")).not.toBeNull();
  });

  it("should show correct result when address is searched", () => {
    mockUseAddressBook.mockReturnValue({ addressBook: addressBook });
    render(
      <AddressBookLocal
        addressBookLocalStatus={AddressBookState.SUCCESS}
        onAddressSelect={() => {}}
        localPageResults={localPageResults}
        network="local"
      />
    );
    expect(screen.getByText("DBS")).not.toBeNull();
  });

  it("should show correct result when identifier is searched", () => {
    mockUseAddressBook.mockReturnValue({ addressBook: addressBook });
    render(
      <AddressBookLocal
        addressBookLocalStatus={AddressBookState.SUCCESS}
        onAddressSelect={() => {}}
        localPageResults={localPageResults}
        network="local"
      />
    );
    expect(screen.getByText("0x28f7ab32c521d13f2e6980d072ca7ca493020145")).not.toBeNull();
  });

  it("should show more than 1 result", () => {
    mockUseAddressBook.mockReturnValue({ addressBook: addressBook });
    render(
      <AddressBookLocal
        addressBookLocalStatus={AddressBookState.SUCCESS}
        onAddressSelect={() => {}}
        localPageResults={localPageResults}
        network="local"
      />
    );
    expect(screen.getAllByTestId("table-row")).toHaveLength(4);
  });

  it("should show no result found message", () => {
    mockUseAddressBook.mockReturnValue({ addressBook: addressBook });
    render(
      <AddressBookLocal
        addressBookLocalStatus={AddressBookState.EMPTY}
        onAddressSelect={() => {}}
        localPageResults={[]}
        network="local"
      />
    );
    expect(screen.getByText("No address found. Try searching again?")).not.toBeNull();
  });
});
