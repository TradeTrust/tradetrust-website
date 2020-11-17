import styled from "@emotion/styled";
import React from "react";

export interface AnnoucementBarProps {
  className?: string;
  backgroundImage?: string;
  children?: React.ReactNode;
}

export const AnnoucementBarUnStyled = ({ className, children }: AnnoucementBarProps) => {
  return (
    <section className={`${className}`}>
      <div className="container">
        <div className="flex w-full">
          <div className="announcement-bar">{children}</div>
        </div>
      </div>
    </section>
  );
};

export const AnnoucementBar = styled(AnnoucementBarUnStyled)`
  padding-top: 15px;
  padding-bottom: 15px;

  .announcement-bar {
    position: relative;
    border-radius: 4px;
    background-image: ${(props) => `url("${props.backgroundImage}")`};
    background-repeat: no-repeat;
    background-position: 50% 50%;
    padding: 30px;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.2);
    }
  }

  .banner-title {
    width: 100%;
    max-width: 250px;
  }
`;
