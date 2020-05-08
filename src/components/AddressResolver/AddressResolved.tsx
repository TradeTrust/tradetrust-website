import React, { useState, useEffect } from "react";
import axios from "axios";
import { isEmpty, transform } from "lodash";
import { useAddressBook, AddressBook } from "./../../common/hooks/useAddressBook";
import { ThirdPartyAPIEntryProps, useThirdPartyAPIEndpoints } from "./../../common/hooks/useThirdPartyAPIEndpoints";

export const AddressResolved = () => {
  const { addressBook } = useAddressBook();
  const { thirdPartyAPIEndpoints } = useThirdPartyAPIEndpoints();
  const [addressResolved, setAddressResolved] = useState({} as AddressBook);

  useEffect(() => {
    const APIrequests: {}[] = [];
    let APIAddresses = {};

    const getThirdPartyAddresses = (url: string) => {
      return axios
        .get(url)
        .then((response) => {
          const lowerCaseAddressesObj = transform(response.data, (result: any, value: string, key: string) => {
            result[key.toLowerCase()] = value;
          });
          APIAddresses = { ...lowerCaseAddressesObj, ...APIAddresses };
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const prepAPIAddressEndpoints = ({ endpoint }: ThirdPartyAPIEntryProps) => {
      APIrequests.push(getThirdPartyAddresses(endpoint));
    };

    if (thirdPartyAPIEndpoints.length > 0) {
      thirdPartyAPIEndpoints.forEach(prepAPIAddressEndpoints);
      axios.all(APIrequests).finally(() => {
        setAddressResolved({ ...addressBook, ...APIAddresses });
      });
    } else {
      setAddressResolved({ ...addressBook });
    }
  }, [addressBook, thirdPartyAPIEndpoints]);

  return (
    <div className="row my-4">
      <div className="col-12">
        <b>AddressResolved (AssetInformationPanel):</b>
        {isEmpty(addressResolved) ? (
          <p>Nothing from local addressbook or third party api.</p>
        ) : (
          <ul>
            {Object.keys(addressResolved).map((key) => {
              const name = addressResolved[key];
              const address = key;

              return (
                <li key={key}>
                  {address} : <b>{name}</b>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
