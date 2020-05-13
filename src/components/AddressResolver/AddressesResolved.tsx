import React from "react";
import { isEmpty } from "lodash";
import { useAddressResolved } from "../../common/hooks/useAddressResolved";

export const AddressesResolved = () => {
  const { addressResolved } = useAddressResolved();

  return (
    <div className="row my-4">
      <div className="col-12">
        <b>AddressResolved (LocalStorage):</b>
        {isEmpty(addressResolved) ? (
          <p>Nothing from local addressbook or third party api.</p>
        ) : (
          <ul>
            {Object.keys(addressResolved).map((key) => {
              return (
                <li key={key}>
                  {key}: <b>{addressResolved[key]}</b>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
