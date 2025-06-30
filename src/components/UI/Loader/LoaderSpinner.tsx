import React, { FunctionComponent } from "react";

export interface LoaderProps {
  className?: string;
  children?: React.ReactNode;
  width?: string;
  primary?: string;
  secondary?: string;
}

const Loader: FunctionComponent<LoaderProps> = ({
  className,
  children,
  width = "24px",
  primary = "#808080",
  secondary = "#d3d3d3",
  ...props
}) => {
  return (
    <div
      className={`animate-spin p-0 rounded-full border-solid border-4 ${className}`}
      {...props}
      style={{
        width: width,
        height: width,
        borderTopColor: primary,
        borderLeftColor: secondary,
        borderBottomColor: secondary,
        borderRightColor: secondary,
      }}
    >
      {children}
    </div>
  );
};

export const LoaderSpinner = Loader;
