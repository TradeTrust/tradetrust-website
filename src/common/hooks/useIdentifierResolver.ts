import { useState, useEffect } from "react";
import axios from "axios";
import { useThirdPartyAPIEndpoints } from "../../common/hooks/useThirdPartyAPIEndpoints";
import { useAddressResolved } from "./useAddressResolved";

export const useIdentifierResolver = (address: string) => {
  const addressLowercase = address.toLowerCase();
  const [resolvedIdentifier, setResolvedIdentifier] = useState(addressLowercase);
  const { thirdPartyAPIEndpoints } = useThirdPartyAPIEndpoints();
  const { addressResolved, setAddressResolved } = useAddressResolved();

  useEffect(() => {
    const resolvedAddressByAddressBook: string | undefined = Object.keys(addressResolved).find((key) => {
      return addressLowercase === key;
    }); // look through addressbook

    const fetchData = (url: string) => {
      axios
        .get(url)
        .then((response) => {
          setResolvedIdentifier(response.data.identity.name);
          addressResolved[response.data.identity.identifier] = response.data.identity.name;
          setAddressResolved({ ...addressResolved });
        })
        .catch((error) => {
          console.log(error);
        });
    }; // look through 3 party api

    if (resolvedAddressByAddressBook !== undefined) {
      setResolvedIdentifier(addressResolved[resolvedAddressByAddressBook]);
    } else {
      thirdPartyAPIEndpoints.forEach((item) => {
        fetchData(item.endpoint + addressLowercase);
      });
    }
  }, [addressLowercase, addressResolved, setAddressResolved, thirdPartyAPIEndpoints]);

  return { resolvedIdentifier };
};
