import React from "react";
import css from "./AddressInfo.module.scss";

interface AddressInfoProps {
  title: string;
  name?: string;
  children: React.ReactNode;
}

export const AddressInfo = ({ title, name, children }: AddressInfoProps) => {
  return (
    <div className={`${css["address-info"]}`}>
      <h6>{title}:</h6>
      {name && <h5>{name}</h5>}
      <div className={css["etherum-address"]}>{children}</div>
    </div>
  );
};
