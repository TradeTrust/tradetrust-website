import React, { useState } from "react";
import { AddressResolved } from "./AddressResolved";
// import { demoResolverAddress } from "./index";

export const AddressResolvedDemo = () => {
  const [address, setAddress] = useState("");

  const onInputChanged = (event: any) => {
    setAddress(event.target.value);
  };

  return (
    <div className="row my-4">
      <div className="col-12">
        <b>AddressResolvedDemo:</b>
        <div className="row">
          <div className="col-auto">
            <input type="text" onChange={onInputChanged} value={address} />
          </div>
          <div className="col-auto">
            <AddressResolved address={address} />
          </div>
        </div>
        {/*
        <AddressResolved address={demoResolverAddress} />
        <AddressResolved address="0x1d350495b4c2a51fbf1c9dedadeab288250c703e" />
        <AddressResolved address="0x28f7ab32c521d13f2e6980d072ca7ca493020145" />
        <AddressResolved address="0xa61b056da0084a5f391ec137583073096880c2e3" />
        <AddressResolved address="0xe94e4f16ad40adc90c29dc85b42f1213e034947c" />
        */}
      </div>
    </div>
  );
};
