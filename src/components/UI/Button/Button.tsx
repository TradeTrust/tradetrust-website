import React, { ReactElement } from "react";
import css from "./Button.module.scss";

interface ButtonProps {
  className?: string;
  color?: "grey" | "primary" | "tertiary" | "white";
  disabled?: boolean;
  children?: ReactElement;
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
}

export const ButtonSolid = ({ className, color, disabled, children, onClick }: ButtonProps) => {
  const modifierClassName = className ? className : "";
  const modifierColor = color !== undefined ? (css[color] ? css[color] : "") : "";

  return (
    <button className={`${css["button"]} ${modifierClassName} ${modifierColor}`} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

export const ButtonIcon = ({ children, ...props }: ButtonProps) => {
  return (
    <ButtonSolid className={`${css.icon}`} {...props}>
      {children}
    </ButtonSolid>
  );
};

export const ButtonCircle = ({ children, ...props }: ButtonProps) => {
  return (
    <ButtonSolid className={`${css.circle}`} {...props}>
      {children}
    </ButtonSolid>
  );
};

export const ButtonBordered = ({ children, ...props }: ButtonProps) => {
  return (
    <ButtonSolid className={`${css.bordered}`} {...props}>
      {children}
    </ButtonSolid>
  );
};
