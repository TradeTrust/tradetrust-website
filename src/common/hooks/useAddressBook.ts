import createPersistedState from "use-persisted-state";
import { Dispatch, SetStateAction } from "react";

export interface AddressBook {
  [key: string]: string;
}

export const useAddressBook = () => {
  const [rawAddressBook, rawSetAddressBook] = createPersistedState("ADDRESS_BOOK")();
  const addressBook: AddressBook | undefined = rawAddressBook;
  const setAddressBook: Dispatch<SetStateAction<AddressBook | undefined>> = rawSetAddressBook;
  const getIdentifier = (address: string) => addressBook && addressBook[address.toLowerCase()];
  return { addressBook, setAddressBook, getIdentifier };
};
