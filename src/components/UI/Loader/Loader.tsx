import styled from "@emotion/styled";
import React from "react";
import { mixin } from "../../../styles";

interface LoaderProps {
  width?: string;
  className?: string;
  children?: React.ReactNode;
  role?: string;
}

export const Loader = ({ children, ...props }: LoaderProps) => {
  return <div {...props}>{children}</div>;
};

export const LoaderSkeleton = styled(Loader)`
  ${(props) => mixin.loaderSkeleton({ w: props.width })};
`;

export const LoaderSpinner = styled(Loader)`
  ${(props) => mixin.loaderSpinner({ w: props.width })};
`;
