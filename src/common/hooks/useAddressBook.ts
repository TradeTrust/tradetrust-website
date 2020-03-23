import createPersistedState from "use-persisted-state";

export interface AddressBook {
  [key: string]: string;
}

export const useAddressBook = () => {
  const defaultAddressBook: AddressBook = {};
  const [addressBook, setAddressBook] = createPersistedState("ADDRESS_BOOK")(defaultAddressBook);
  const getIdentifier = (address: string) => addressBook[address.toLowerCase()];
  return { addressBook, setAddressBook, getIdentifier };
};
