import styled from "@emotion/styled";
import React from "react";

interface LoaderProps {
  className?: string;
  width?: string;
}

const Loader = ({ className, width = "260px", ...props }: LoaderProps) => {
  return <div className={`skeleton-loading ${className}`} {...props} style={{ width: width }} />;
};

export const LoaderSkeleton = styled(Loader)`
  &:empty {
    &::after {
      content: "";
      display: block;
      background-repeat: no-repeat;
      background-color: #e5e5e5;
      background-image: linear-gradient(to left, #e5e5e5 0%, #f5f5f5 50%, #e5e5e5 100%);
      background-size: 50% 100%;
      height: 24px;
      border-radius: 2px;
    }
  }
`;
