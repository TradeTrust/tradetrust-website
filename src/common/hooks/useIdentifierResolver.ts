import { useState, useEffect } from "react";
import { useThirdPartyAPIEndpoints } from "../../common/hooks/useThirdPartyAPIEndpoints";
import { useAddressBook } from "./useAddressBook";
import { getIdentityName } from "./../../services/addressResolver";

export const useIdentifierResolver = (address: string) => {
  const [resolvedIdentifier, setResolvedIdentifier] = useState("");
  const { thirdPartyAPIEndpoints } = useThirdPartyAPIEndpoints();
  const { getIdentifier } = useAddressBook();

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

  useEffect(() => setResolvedIdentifier(""), [address]); // unset resolvedIdentifier when address is different

  return { resolvedIdentifier };
};
