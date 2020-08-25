import { useCallback } from "react";
import createPersistedState from "use-persisted-state";
import { IdentifierResults } from "./useIdentifierResolver";

export interface AddressBook {
  [key: string]: string;
}

export const useAddressBook = () => {
  const defaultAddressBook: AddressBook = {};
  const [addressBook, setAddressBook] = createPersistedState("ADDRESS_BOOK")(defaultAddressBook);
  const getIdentifier = useCallback(
    (address: string): IdentifierResults | undefined => {
      const result = addressBook[address.toLowerCase()];
      return result ? { result, source: "Local" } : undefined;
    },
    [addressBook]
  ); // useCallback needed to prevent multiple calls
  return { addressBook, setAddressBook, getIdentifier };
};
