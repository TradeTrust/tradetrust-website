import { useState, useEffect } from "react";
import { useThirdPartyAPIEndpoints } from "../../common/hooks/useThirdPartyAPIEndpoints";
import { useAddressBook } from "./useAddressBook";
import { getIdentityName } from "./../../services/addressResolver";

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

    const resolveIdentityName = async () => {
      const identityName = await getIdentityName(thirdPartyAPIEndpoints, address); // resolved from thirdparty endpoint

      if (identityName === undefined) {
        setResolvedIdentifier("");
      } else {
        setResolvedIdentifier(identityName);
      }
    };

    resolveIdentityName();
  }, [address, addressLowercase, getIdentifier, thirdPartyAPIEndpoints]);

  return { resolvedIdentifier };
};
