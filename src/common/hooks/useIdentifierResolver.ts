import { useState, useEffect } from "react";
import { useThirdPartyAPIEndpoints } from "./useThirdPartyAPIEndpoints";
import { useAddressBook } from "./useAddressBook";
import { getIdentityName } from "./../../services/addressResolver";

export const useIdentifierResolver = (address: string) => {
  const [resolvedIdentifier, setResolvedIdentifier] = useState("");
  const { thirdPartyAPIEndpoints } = useThirdPartyAPIEndpoints();
  const { getIdentifier } = useAddressBook();

  useEffect(() => {
    if (!address) return;

    setResolvedIdentifier(""); // unset resolvedIdentifier at beginning

    const resolveIdentity = async () => {
      // resolve by address book first, then by thirdparty endpoint
      const identityName =
        getIdentifier(address.toLowerCase()) || (await getIdentityName(thirdPartyAPIEndpoints, address));
      if (identityName) {
        setResolvedIdentifier(identityName);
      }
    };

    resolveIdentity();
  }, [address, getIdentifier, thirdPartyAPIEndpoints]);

  return { resolvedIdentifier };
};
