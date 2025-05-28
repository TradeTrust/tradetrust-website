import React, { FunctionComponent, AnchorHTMLAttributes, ButtonHTMLAttributes, LabelHTMLAttributes } from "react";

interface GetSharedStylesButton {
  padding: string;
  height: string;
}

const getSharedStylesButton = (shared: GetSharedStylesButton): string => {
  const { padding, height } = shared;

  return `box-border transition-colors duration-200 ease-out cursor-pointer font-gilroy-bold border ${padding} ${height}`;
};

export enum ButtonSize {
  XS = "rounded-xl",
  SM = "py-1 px-2 rounded-xl",
  MD = "p-2 rounded-xl",
  LG = "py-3 px-4 rounded-xl",
}

export enum ButtonHeight {
  SM = "min-h-8", // 2rem = 32px
  MD = "min-h-10", // 2.5rem = 40px
  LG = "min-h-12", // 3rem = 48px
}

export interface ButtonTradeTrust extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  height?: ButtonHeight;
}

interface AnchorTradeTrust extends AnchorHTMLAttributes<HTMLAnchorElement> {
  size?: ButtonSize;
  height?: ButtonHeight;
}

interface LabelTradeTrust extends LabelHTMLAttributes<HTMLLabelElement> {
  size?: ButtonSize;
  height?: ButtonHeight;
}

export const Button: FunctionComponent<ButtonTradeTrust> = ({
  className,
  children,
  disabled,
  size = ButtonSize.MD,
  height = ButtonHeight.MD,
  ...props
}) => {
  const shared = getSharedStylesButton({ padding: size, height });

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
  size = ButtonSize.XS,
  height = ButtonHeight.MD,
  ...props
}) => {
  const shared = getSharedStylesButton({ padding: size, height });

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
  height = ButtonHeight.MD,
  ...props
}) => {
  const shared = getSharedStylesButton({ padding: size, height });

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
  height = ButtonHeight.MD,
  ...props
}) => {
  const shared = getSharedStylesButton({ padding: size, height });

  return (
    <label className={`block ${shared} ${className}`} {...props}>
      {children}
    </label>
  );
};
