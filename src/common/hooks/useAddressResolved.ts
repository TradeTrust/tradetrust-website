import createPersistedState from "use-persisted-state";
import { useAddressBook, AddressBook } from "./useAddressBook";

export const useAddressResolved = () => {
  const { addressBook } = useAddressBook();
  const defaultAddressResolver: AddressBook = addressBook; // default to get addressbook localStorage
  const [addressResolved, setAddressResolved] = createPersistedState("ADDRESS_RESOLVER")(defaultAddressResolver);
  const getIdentifier = (address: string) => addressResolved[address.toLowerCase()];
  return { addressResolved, setAddressResolved, getIdentifier };
};
