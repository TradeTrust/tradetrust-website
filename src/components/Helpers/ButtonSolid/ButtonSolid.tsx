import React, { ReactElement } from "react";
import css from "./ButtonSolid.module.scss";

interface ButtonSolidProps {
  color?: string;
  children: ReactElement;
}

export const ButtonSolid = ({ color = "", children }: ButtonSolidProps) => {
  const modifier = css[color] ? css[color] : "";

  return <button className={`${css["button-solid"]} ${modifier}`}>{children}</button>;
};
