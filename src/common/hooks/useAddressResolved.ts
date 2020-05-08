import createPersistedState from "use-persisted-state";

export interface AddressResolvedProps {
  [key: string]: string;
}

export const useAddressResolved = () => {
  const defaultAddressResolver: AddressResolvedProps = {};
  const [addressResolved, setAddressResolved] = createPersistedState("ADDRESS_RESOLVER")(defaultAddressResolver);
  const getIdentifier = (address: string) => addressResolved[address.toLowerCase()];
  return { addressResolved, setAddressResolved, getIdentifier };
};
