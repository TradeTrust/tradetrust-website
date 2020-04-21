import React from "react";
import css from "./AddressButtons.module.scss";
import { SvgIcon, SvgIconBook, SvgIconX } from "../../UI/SvgIcon";
import { ButtonSolidWhiteOrange, ButtonSolidOrange, ButtonCircleGreylight } from "../../UI/Button";

interface AddressButtonsProps {
  holderAddress: string;
  beneficiaryAddress?: string;
  isDisabledAddressBook?: boolean;
  buttonText: string;
  onButtonSubmit?(event: React.MouseEvent<HTMLButtonElement>): void;
}

export const AddressButtons = ({
  holderAddress,
  beneficiaryAddress,
  isDisabledAddressBook,
  buttonText,
  onButtonSubmit,
}: AddressButtonsProps) => {
  const isSubmitEnabled =
    beneficiaryAddress === undefined
      ? holderAddress.length === 0
      : holderAddress.length === 0 || beneficiaryAddress.length === 0;

  return (
    <div className={css["address-cta"]}>
      <ButtonSolidWhiteOrange disabled={isDisabledAddressBook}>
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
      </ButtonSolidWhiteOrange>
      <ButtonSolidOrange disabled={isSubmitEnabled} onClick={onButtonSubmit}>
        {buttonText}
      </ButtonSolidOrange>
      <ButtonCircleGreylight>
        <SvgIcon>
          <SvgIconX />
        </SvgIcon>
      </ButtonCircleGreylight>
    </div>
  );
};
