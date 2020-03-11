import React, { ReactElement } from "react";
import css from "./AddressInput.module.scss";

interface AddressInputProps {
  errorMessage?: string;
  layoutCtaRight?: ReactElement;
  layoutCtaBottom?: ReactElement;
  address: string;
  setAddress: (e: any) => void;
  disabled?: boolean;
}

export const AddressInput = ({
  errorMessage = "",
  layoutCtaRight,
  layoutCtaBottom,
  address,
  setAddress,
  disabled
}: AddressInputProps) => {
  return (
    <div className={`${css["address-input"]}`}>
      <div className="row no-gutters">
        <div className={`col-12 ${layoutCtaRight ? "col-lg" : "mb-2"}`}>
          <input
            className={`${css["input"]} ${errorMessage && address.length === 0 ? css["is-error"] : ""}`}
            value={address}
            onChange={e => setAddress(e.target.value)}
            disabled={disabled}
            type="text"
          />
          {errorMessage && address.length === 0 && <p className={`${css["message-error"]}`}>{errorMessage}</p>}
        </div>
        {layoutCtaRight && <div className="col-12 col-lg-auto ml-lg-auto">{layoutCtaRight}</div>}
        {layoutCtaBottom && <div className="col-12 col-lg-auto ml-lg-auto">{layoutCtaBottom}</div>}
      </div>
    </div>
  );
};
