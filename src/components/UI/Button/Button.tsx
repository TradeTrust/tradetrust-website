import React, { ReactElement } from "react";
import css from "./Button.module.scss";

interface ButtonProps {
  className?: string;
  color?: "grey" | "orange" | "white";
  disabled?: boolean;
  children?: ReactElement;
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
}

export const ButtonSolid = ({ className, color, disabled, children, onClick }: ButtonProps) => {
  const modifierColor = color !== undefined ? (css[color] ? css[color] : "") : "";

  return (
    <button className={`${css["button"]} ${className} ${modifierColor}`} disabled={disabled} onClick={onClick}>
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
