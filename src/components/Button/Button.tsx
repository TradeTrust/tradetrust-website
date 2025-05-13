import React, { FunctionComponent, AnchorHTMLAttributes, ButtonHTMLAttributes, LabelHTMLAttributes } from "react";

interface GetSharedStylesButton {
  padding: string;
}

const getSharedStylesButton = (shared: GetSharedStylesButton): string => {
  const { padding } = shared;

  return `transition-colors duration-200 ease-out cursor-pointer font-gilroy-bold border ${padding}`;
};

export enum ButtonSize {
  SM = "py-1 px-2 rounded-xl",
  MD = "p-2 rounded-xl",
  LG = "py-3 px-4 rounded-xl",
}

export interface ButtonTradeTrust extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
}

interface AnchorTradeTrust extends AnchorHTMLAttributes<HTMLAnchorElement> {
  size?: ButtonSize;
}

interface LabelTradeTrust extends LabelHTMLAttributes<HTMLLabelElement> {
  size?: ButtonSize;
}

export const Button: FunctionComponent<ButtonTradeTrust> = ({
  className,
  children,
  disabled,
  size = ButtonSize.MD,
  ...props
}) => {
  const shared = getSharedStylesButton({ padding: size });

  return (
    <button
      className={`${shared} ${className} ${
        disabled ? "cursor-not-allowed bg-gray-200 text-white hover:bg-gray-200" : ""
      }`}
      type="submit"
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export const ButtonIcon: FunctionComponent<ButtonTradeTrust> = ({
  className,
  children,
  disabled,
  size = ButtonSize.MD,
  ...props
}) => {
  const shared = getSharedStylesButton({ padding: size });

  return (
    <button
      style={{
        width: 40,
        height: 40,
      }}
      className={`button-icon ${shared} ${className} ${
        disabled && "cursor-not-allowed bg-gray-50 text-gray-300 hover:bg-gray-200"
      }`}
      type="submit"
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export const LinkButton: FunctionComponent<AnchorTradeTrust> = ({
  className,
  children,
  size = ButtonSize.MD,
  ...props
}) => {
  const shared = getSharedStylesButton({ padding: size });

  return (
    <a className={`block ${shared} ${className}`} rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
};

export const LabelButton: FunctionComponent<LabelTradeTrust> = ({
  className,
  children,
  size = ButtonSize.MD,
  ...props
}) => {
  const shared = getSharedStylesButton({ padding: size });

  return (
    <label className={`block ${shared} ${className}`} {...props}>
      {children}
    </label>
  );
};
