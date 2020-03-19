import createPersistedState from "use-persisted-state";

export interface AddressBook {
  [key: string]: string;
}

export const useAddressBook = () => {
  const [rawAddressBook, rawSetAddressBook] = createPersistedState("ADDRESS_BOOK")();
  const addressBook: AddressBook | undefined = rawAddressBook;
  const setAddressBook = (newAddressBook: AddressBook) => rawSetAddressBook(newAddressBook);
  const getIdentifier = (address: string) => addressBook && addressBook[address];
  return { addressBook, setAddressBook, getIdentifier };
};
