import { useState, useEffect } from "react";
import { useThirdPartyAPIEndpoints } from "./useThirdPartyAPIEndpoints";
import { useAddressBook } from "./useAddressBook";
import { getIdentityName } from "./../../services/addressResolver";

export const useIdentifierResolver = (address: string) => {
  const [resolvedIdentifier, setResolvedIdentifier] = useState("");
  const { thirdPartyAPIEndpoints } = useThirdPartyAPIEndpoints();
  const { getIdentifier } = useAddressBook();

  useEffect(() => setResolvedIdentifier(""), [address]); // unset resolvedIdentifier when address is different

  useEffect(() => {
    if (address === "") return;

    const identifierFromAddressBook = getIdentifier(address.toLowerCase());
    if (identifierFromAddressBook) {
      setResolvedIdentifier(identifierFromAddressBook);
      return;
    } // resolved from addressbook

    const resolveIdentityByAPI = async () => {
      const identityName = await getIdentityName(thirdPartyAPIEndpoints, address);
      if (identityName) {
        setResolvedIdentifier(identityName);
      }
    }; // resolved from thirdparty endpoint

    resolveIdentityByAPI();
  }, [address, getIdentifier, thirdPartyAPIEndpoints]);

  return { resolvedIdentifier };
};
