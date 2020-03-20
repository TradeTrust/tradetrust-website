import React, { ReactElement } from "react";
import css from "./AddressInfo.module.scss";

interface AddressInfoProps {
  title: string;
  name?: string;
  children: ReactElement;
}

export const AddressInfo = ({ title, name, children }: AddressInfoProps) => {
  return (
    <div className={`${css["address-info"]}`}>
      <h6>{title}:</h6>
      <div className="row mb-2 align-items-end">
        <div className="col-auto">
          {name && <h5>{name}</h5>}
          <div className={css["etherum-address"]}>{children}</div>
        </div>
      </div>
    </div>
  );
};
