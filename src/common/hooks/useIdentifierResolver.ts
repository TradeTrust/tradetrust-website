import { useState, useEffect } from "react";
import { useThirdPartyAPIEndpoints } from "../../common/hooks/useThirdPartyAPIEndpoints";
import { useAddressBook } from "./useAddressBook";
import { resolveAddressNameByEndpoint } from "./../../services/addressResolver";

export const useIdentifierResolver = (address: string) => {
  const addressLowercase = address.toLowerCase();
  const [resolvedIdentifier, setResolvedIdentifier] = useState("");
  const { thirdPartyAPIEndpoints } = useThirdPartyAPIEndpoints();
  const { getIdentifier } = useAddressBook();

  useEffect(() => {
    if (address === "") {
      return;
    }

    const identifierFromAddressBook = getIdentifier(addressLowercase);
    if (identifierFromAddressBook) {
      setResolvedIdentifier(identifierFromAddressBook);
      return;
    } // resolved from addressbook

    const resolvedAddress = async () => {
      const resolvedName = await thirdPartyAPIEndpoints.reduce(async (accumulator, currentValue) => {
        if ((await accumulator) !== undefined) return accumulator;
        const result = await resolveAddressNameByEndpoint(currentValue.endpoint + address);
        return result;
      }, Promise.resolve(undefined));

      if (resolvedName === undefined) {
        setResolvedIdentifier("");
      } else {
        setResolvedIdentifier(resolvedName);
      }
    }; // resolved from thirdpary endpoint

    resolvedAddress();
  }, [address, addressLowercase, getIdentifier, thirdPartyAPIEndpoints]);

  return { resolvedIdentifier };
};
