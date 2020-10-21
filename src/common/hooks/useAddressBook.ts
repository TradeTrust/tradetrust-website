import { useCallback } from "react";
import createPersistedState from "use-persisted-state";
import { ResolutionResult } from "./useIdentifierResolver";

export interface AddressBookLocalProps {
  [key: string]: string;
}

export const useAddressBook = () => {
  const defaultAddressBook: AddressBookLocalProps = {};
  const [addressBook, setAddressBook] = createPersistedState("ADDRESS_BOOK")(defaultAddressBook);
  const getIdentifier = useCallback(
    (address: string): ResolutionResult | undefined => {
      const result = addressBook[address.toLowerCase()];
      return result ? { name: result, resolvedBy: "Local", source: "" } : undefined;
    },
    [addressBook]
  ); // useCallback needed to prevent multiple calls
  return { addressBook, setAddressBook, getIdentifier };
};
