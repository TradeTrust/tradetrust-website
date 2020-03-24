import React from "react";
import css from "./LabelBordered.module.scss";

interface LabelBorderedProps {
  color?: "green" | "red";
  children: string;
}

export const LabelBordered = ({ color, children }: LabelBorderedProps) => {
  const modifierColor = color !== undefined ? (css[color] ? css[color] : "") : "";

  return <div className={`${css["label-bordered"]} ${modifierColor}`}>{children}</div>;
};
