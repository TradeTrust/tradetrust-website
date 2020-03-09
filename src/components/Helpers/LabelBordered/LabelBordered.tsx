import React, { ReactElement } from "react";
import css from "./LabelBordered.scss";

interface LabelBorderedProps {
  color?: string;
  children: ReactElement;
}

export const LabelBordered = ({ color = "", children }: LabelBorderedProps) => {
  const modifier = css[color] ? css[color] : "";

  return <div className={`${css["label-bordered"]} ${modifier}`}>{children}</div>;
};
