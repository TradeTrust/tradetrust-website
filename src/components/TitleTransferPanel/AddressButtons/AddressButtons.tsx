import React from "react";
import css from "./AddressButtons.module.scss";
import { SvgIcon, SvgIconBook, } from "../../UI/SvgIcon";
import { ButtonSolidWhiteOrange, } from "../../UI/Button";

interface AddressButtonsProps {
  isDisabledAddressBook?: boolean;
}

export const AddressButtons = ({
  isDisabledAddressBook,
}: AddressButtonsProps) => {

  return (
    <div className={css["address-cta"]}>
      <ButtonSolidWhiteOrange disabled={isDisabledAddressBook}>
        <div className="row no-gutters align-items-center">
          <div className="col-auto">
            <SvgIcon>
              <SvgIconBook />
            </SvgIcon>
          </div>
        </div>
      </ButtonSolidWhiteOrange>
    </div>
  );
};
