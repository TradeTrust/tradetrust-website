import React, { useState } from "react";
import { AddressInput } from "./../AddressInput";
import { AddressCta } from "./../AddressCta";

export const PrepareEndorsement = () => {
  const [outgoingHolderAddress, setOutgoingHolderAddress] = useState("");
  const [outgoingBeneficiaryAddress, setOutgoingBeneficiaryAddress] = useState("");

  return (
    <>
      <AddressInput address={outgoingHolderAddress} setAddress={setOutgoingHolderAddress} />
      <AddressInput
        address={outgoingBeneficiaryAddress}
        setAddress={setOutgoingBeneficiaryAddress}
        layoutCtaBottom={
          <AddressCta
            buttonText="Endorse"
            onButtonSubmit={() => {}}
            holderAddress={outgoingHolderAddress}
            beneficiaryAddress={outgoingBeneficiaryAddress}
          />
        }
      />
    </>
  );
};
