import { useState, useEffect } from "react";
import axios from "axios";
import { useThirdPartyAPIEndpoints } from "../../common/hooks/useThirdPartyAPIEndpoints";
import { useAddressResolved } from "./useAddressResolved";

export const useIdentifierResolver = (address: string) => {
  const addressLowercase = address.toLowerCase();
  const [resolvedIdentifier, setResolvedIdentifier] = useState("");
  const { thirdPartyAPIEndpoints } = useThirdPartyAPIEndpoints();
  const { addressResolved, setAddressResolved } = useAddressResolved();

  useEffect(() => {
    if (address === "") {
      return;
    }

    const resolvedAddressByAddressBook: string | undefined = Object.keys(addressResolved).find((key) => {
      return addressLowercase === key;
    }); // look through addressbook

    const fetchData = (url: string) => {
      axios
        .get(url)
        .then((response) => {
          addressResolved[response.data.identity.identifier] = response.data.identity.name;
          setAddressResolved({ ...addressResolved });
          setResolvedIdentifier(response.data.identity.name);
        })
        .catch((error) => {
          console.log(error.message);
          setResolvedIdentifier(addressLowercase);
        });
    }; // look through 3 party api

    if (resolvedAddressByAddressBook !== undefined) {
      setResolvedIdentifier(addressResolved[resolvedAddressByAddressBook]);
    } else {
      if (thirdPartyAPIEndpoints.length > 0) {
        thirdPartyAPIEndpoints.forEach((item) => {
          fetchData(item.endpoint + addressLowercase);
        });
      } else {
        setResolvedIdentifier(addressLowercase);
      }
    }
  }, [address, addressLowercase, addressResolved, setAddressResolved, thirdPartyAPIEndpoints]);

  return { resolvedIdentifier };
};
