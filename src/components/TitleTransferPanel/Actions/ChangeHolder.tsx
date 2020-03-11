import React, { useState } from "react";
import { AddressInput } from "./../AddressInput";
import { AddressCta } from "./../AddressCta";

export const ChangeHolder = () => {
  const [outgoingHolderAddress, setOutgoingHolderAddress] = useState("");

  return (
    <AddressInput
      address={outgoingHolderAddress}
      setAddress={setOutgoingHolderAddress}
      layoutCtaRight={
        <AddressCta buttonText="Transfer" onButtonSubmit={() => {}} holderAddress={outgoingHolderAddress} />
      }
    />
  );
};
