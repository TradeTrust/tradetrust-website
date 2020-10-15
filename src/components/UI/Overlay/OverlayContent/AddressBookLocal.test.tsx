import React from "react";
import { render, screen } from "@testing-library/react";
import { AddressBookLocal } from "./AddressBookLocal";

const Wrapper = ({ searchTerm }: { searchTerm: string }) => {
  const addressBook = {
    "0xe94e4f16ad40adc90c29dc85b42f1213e034947c": "Bank of China",
    "0xa61b056da0084a5f391ec137583073096880c2e3": "DBS",
    "0x1d350495b4c2a51fbf1c9dedadeab288250c703e": "China Oil",
    "0x28f7ab32c521d13f2e6980d072ca7ca493020145": "Standard Chartered",
  };
  localStorage.setItem("ADDRESS_BOOK", JSON.stringify(addressBook));

  return <AddressBookLocal onAddressSelect={() => {}} searchTerm={searchTerm} />;
};

describe("AddressBookLocal", () => {
  it("should show default message", () => {
    render(<AddressBookLocal onAddressSelect={() => {}} searchTerm={""} />);
    expect(screen.getByText("No address found. Try importing a csv template file?")).not.toBeNull();
  });

  it("should show correct result when address is searched", () => {
    render(<Wrapper searchTerm={"0xa"} />);
    expect(screen.getByText("DBS")).not.toBeNull();
  });

  it("should show correct result when identifier is searched", () => {
    render(<Wrapper searchTerm={"Standard"} />);
    expect(screen.getByText("0x28f7ab32c521d13f2e6980d072ca7ca493020145")).not.toBeNull();
  });

  it("should show more than 1 result", () => {
    render(<Wrapper searchTerm={"China"} />);
    expect(screen.getAllByTestId("table-row")).toHaveLength(2);
  });

  it("should show no result found message", () => {
    render(<Wrapper searchTerm={"abc"} />);
    expect(screen.getByText("No address found.")).not.toBeNull();
  });
});
