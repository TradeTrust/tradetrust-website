import { useState, useEffect } from "react";
import { useThirdPartyAPIEndpoints } from "./useThirdPartyAPIEndpoints";
import { getIdentityName } from "./../../services/addressResolver";
import { useAddressBook } from "@govtechsg/address-identity-resolver";

export type ResolutionResult = {
  name: string;
  resolvedBy: string;
  source: string;
};

export const useIdentifierResolver = (address: string) => {
  const [identityName, setIdentityName] = useState("");
  const [identityResolvedBy, setIdentityResolvedBy] = useState("");
  const [identitySource, setIdentitySource] = useState("");
  const { thirdPartyAPIEndpoints } = useThirdPartyAPIEndpoints();
  const { getIdentifier } = useAddressBook();

  useEffect(() => {
    if (!address) return;

    setIdentityName(""); // unset identityName at beginning

    const resolveIdentity = async () => {
      // resolve by address book first, then by thirdparty endpoint
      const identity = getIdentifier(address.toLowerCase()) || (await getIdentity(thirdPartyAPIEndpoints, address));
      if (identity) {
        setIdentityName(identity.name);
        setIdentityResolvedBy(identity.resolvedBy);
        setIdentitySource(identity.source);
      }
    };

    resolveIdentity();
  }, [address, getIdentifier, thirdPartyAPIEndpoints]);

  return { identityName, identityResolvedBy, identitySource };
};
