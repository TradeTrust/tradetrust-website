import { useCallback } from "react";
import createPersistedState from "use-persisted-state";

export interface AddressBook {
  [key: string]: string;
}

export const useAddressBook = () => {
  const defaultAddressBook: AddressBook = {};
  const [addressBook, setAddressBook] = createPersistedState("ADDRESS_BOOK")(defaultAddressBook);
  const getIdentifier = useCallback((address: string) => addressBook[address.toLowerCase()], [addressBook]); // useCallback needed to prevent multiple calls
  return { addressBook, setAddressBook, getIdentifier };
};
