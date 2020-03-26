import React from "react";
import css from "./Button.module.scss";

interface ButtonProps {
  text?: string;
  color?: "primary" | "secondary" | "white";
  bg?: "primary" | "tertiary" | "white" | "grey-light";
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
}

export const ButtonSolid = ({ className, color, bg, children, ...props }: ButtonProps) => {
  const modifierClassName = className ? className : "";
  const modifierColor = color !== undefined ? (css[`text-${color}`] ? css[`text-${color}`] : "") : "";
  const modifierBg = bg !== undefined ? (css[bg] ? css[bg] : "") : "";

  return (
    <button className={`${css["button"]} ${modifierClassName} ${modifierColor} ${modifierBg}`} {...props}>
      {children}
    </button>
  );
};

export const ButtonIconText = ({ text, children, ...props }: ButtonProps) => {
  return (
    <ButtonSolid className={`${css.icontext}`} {...props}>
      <div className="row align-items-center no-gutters">
        <div className="col-auto">{children}</div>
        <div className="col-auto">{text}</div>
      </div>
    </ButtonSolid>
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
