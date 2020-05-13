import React, { useState } from "react";
import { demoResolverAddress } from "./index";
import { AddressResolved } from "./AddressesResolvedDemo";

export const AddressResolveDemo = () => {
  const [showAddressResolved, setAddressResolved] = useState(false);

  return (
    <div className="row my-4">
      <div className="col-12">
        <b>AddressResolveDemo:</b>
        <div className="row">
          <div className="col-auto">{demoResolverAddress}</div>
          <div className="col-auto">
            <button
              onClick={() => {
                setAddressResolved(true);
              }}
            >
              manual resolve
            </button>
          </div>
        </div>
        {showAddressResolved && <AddressResolved address={demoResolverAddress} />}
      </div>
    </div>
  );
};
