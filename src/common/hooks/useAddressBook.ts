import createPersistedState from "use-persisted-state";
import { Dispatch, SetStateAction } from "react";

export interface AddressBook {
  [key: string]: string;
}

export const useAddressBook = () => {
  const [rawAddressBook, rawSetAddressBook] = createPersistedState("ADDRESS_BOOK")();
  // Recasting the dispatch action as the @types/use-persisted-state does not provide generics to set type
  const addressBook: AddressBook | undefined = rawAddressBook;
  const setAddressBook: Dispatch<SetStateAction<AddressBook>> = rawSetAddressBook as Dispatch<SetStateAction<unknown>>;

  const getIdentifier = (address: string) => addressBook && addressBook[address.toLowerCase()];
  return { addressBook, setAddressBook, getIdentifier };
};
