import React from "react";
import { AddressInput } from "./../AddressInput";
import { AddressCta } from "./../AddressCta";

interface FinaliseEndorsementProps {
  finaliseEndorsementHolderAddress: string;
  finaliseEndorsementBeneficiaryAddress: string;
}

export const FinaliseEndorsement = ({
  finaliseEndorsementHolderAddress,
  finaliseEndorsementBeneficiaryAddress
}: FinaliseEndorsementProps) => {
  return (
    <>
      <AddressInput address={finaliseEndorsementHolderAddress} setAddress={() => {}} disabled />
      <AddressInput
        address={finaliseEndorsementBeneficiaryAddress}
        setAddress={() => {}}
        disabled
        layoutCtaBottom={
          <AddressCta
            buttonText="Confirm"
            onButtonSubmit={() => {}}
            holderAddress={finaliseEndorsementHolderAddress}
            beneficiaryAddress={finaliseEndorsementBeneficiaryAddress}
            isDisabledAddressBook={true}
          />
        }
      />
    </>
  );
};
