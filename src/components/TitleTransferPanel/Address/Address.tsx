import React, { ReactElement } from "react";
import css from "./Address.module.scss";

interface AddressProps {
  title: string;
  name?: string;
  children: ReactElement;
}

export const Address = ({ title, name, children }: AddressProps) => {
  return (
    <div className={`${css["address"]}`}>
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
