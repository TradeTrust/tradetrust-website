import React from "react";
import { SvgIcon, SvgIconBook, SvgIconX } from "../../Helpers/SvgIcon";
import { ButtonIcon, ButtonSolid, ButtonCircle } from "../../Helpers/Button";

interface AddressCtaProps {
  holderAddress: string;
  beneficiaryAddress?: string;
  isDisabledAddressBook?: boolean;
  buttonText: string;
  onButtonSubmit?(event: React.MouseEvent<HTMLButtonElement>): void;
}

export const AddressCta = ({
  holderAddress,
  beneficiaryAddress,
  isDisabledAddressBook,
  buttonText,
  onButtonSubmit
}: AddressCtaProps) => {
  const isDisableButtonSubmit =
    beneficiaryAddress !== undefined
      ? holderAddress.length === 0 || beneficiaryAddress.length === 0
      : holderAddress.length === 0;
  return (
    <>
      <ButtonIcon color="white" disabled={isDisabledAddressBook}>
        <div className="row no-gutters align-items-center">
          <div className="col-auto mr-2">
            <SvgIcon>
              <SvgIconBook />
            </SvgIcon>
          </div>
          <div className="col">
            <p>Address</p>
          </div>
        </div>
      </ButtonIcon>
      <ButtonSolid color="orange" disabled={isDisableButtonSubmit} onClick={onButtonSubmit}>
        <p>{buttonText}</p>
      </ButtonSolid>
      <ButtonCircle color="grey">
        <SvgIcon>
          <SvgIconX />
        </SvgIcon>
      </ButtonCircle>
    </>
  );
};
