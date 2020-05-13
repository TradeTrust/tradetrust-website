import { useState, useEffect } from "react";
import axios from "axios";
import { useAddressBook } from "./useAddressBook";
import { useThirdPartyAPIEndpoints } from "../../common/hooks/useThirdPartyAPIEndpoints";
import { useAddressResolved } from "../../common/hooks/useAddressResolved";

export const useIdentifierResolver = (address: string) => {
  const addressLowercase = address.toLowerCase();
  const [resolvedIdentifier, setResolvedIdentifier] = useState(addressLowercase);
  const [isCompleted, setCompleted] = useState(false);
  const { thirdPartyAPIEndpoints } = useThirdPartyAPIEndpoints();
  const { addressBook } = useAddressBook();
  const { addressResolved, setAddressResolved } = useAddressResolved();

  useEffect(() => {
    if (!isCompleted) {
      const resolvedAddressByAddressBook: string | undefined = Object.keys(addressBook).find((key) => {
        return addressLowercase === key;
      }); // look through addressbook

      const fetchData = (url: string) => {
        axios
          .get(url)
          .then((response) => {
            setResolvedIdentifier(response.data.identity.name);
            addressResolved[response.data.identity.identifier] = response.data.identity.name;
            setAddressResolved({ ...addressResolved });
            setCompleted(true);
          })
          .catch((error) => {
            console.log(error, "error");
          });
      }; // look through 3 party api

      if (resolvedAddressByAddressBook !== undefined) {
        setResolvedIdentifier(addressBook[resolvedAddressByAddressBook]);
        setCompleted(true);
      } else {
        thirdPartyAPIEndpoints.forEach((item) => {
          fetchData(item.endpoint + addressLowercase);
        });
      }
    }
  }, [addressBook, addressLowercase, addressResolved, isCompleted, setAddressResolved, thirdPartyAPIEndpoints]);

  return { resolvedIdentifier, isCompleted };
};
