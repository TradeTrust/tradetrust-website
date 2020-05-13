import React from "react";
import { isEmpty } from "lodash";
import { useAddressResolved } from "../../common/hooks/useAddressResolved";
import { useIdentifierResolver } from "./../../common/hooks/useIdentifierResolver";

export const AddressResolved = ({ address }: { address: string }) => {
  const { resolvedIdentifier, resolvedRemarks } = useIdentifierResolver(address);
  console.log(resolvedIdentifier, "   !!!");

  return (
    <div>
      {address} : <b>{resolvedIdentifier}</b>
      {resolvedRemarks !== "" &&
        <span> ({resolvedRemarks})</span>
      }
    </div>
  );
};

export const AddressesResolvedDemo = () => {
  const { addressResolved } = useAddressResolved();

  return (
    <div className="row my-4">
      <div className="col-12">
        <b>AddressResolvedDemo:</b>
        {isEmpty(addressResolved) ? (
          <p>Nothing from local addressbook or third party api.</p>
        ) : (
          <ul>
            {Object.keys(addressResolved).map((key) => {
              return (
                <li key={key}>
                  <AddressResolved address={key} />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
