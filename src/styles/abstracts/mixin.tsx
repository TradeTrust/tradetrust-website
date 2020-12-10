import css, { SerializedStyles } from "@emotion/css";
import { darken } from "polished";
import tw from "twin.macro";
import * as vars from "./variables";

export const loaderSkeleton = ({ w = "260px", h = "24px", bg = "#e5e5e5", loaderBg = "#f5f5f5", loaderW = "50%" }) => {
  return `
    &:empty {
      &::after {
        content: "";
        display: block;
        background-repeat: no-repeat;
        background-color: ${bg};
        background-image: linear-gradient(to left, ${bg} 0%, ${loaderBg} 50%, ${bg} 100%);
        background-size: ${loaderW} 100%;
        width: ${w};
        height: ${h};
        border-radius: 2px;
        animation: skeleton-loading 1.4s infinite;
      }
    }
  `;
};

export const loaderSpinner = ({
  w = "24px",
  borderW = "4px",
  spd = "0.9s",
  primary = darken(0.45, vars.white),
  secondary = darken(0.25, vars.white),
}) => {
  return `
    width: ${w};
    height: ${w};
    padding: 0;
    border-radius: 50%;
    border-style: solid;
    border-width: ${borderW};
    border-top-color: ${primary};
    border-left-color: ${secondary};
    border-bottom-color: ${secondary};
    border-right-color: ${secondary};
    animation: spinning ${spd} linear infinite;
  `;
};

export const centerVertical = () => {
  return `
    display: flex;
    flex-direction: column;
    justify-content: center;
  `;
};

export const aspectRatio = (width = 16, height = 9) => {
  return `
    position: relative;
    width: 100%;

    &::before {
      content: '';
      width: 1px;
      margin-left: -1px;
      float: left;
      height: 0;
      padding-top: ${(height / width) * 100}%;
    }

    &::after {
      content: '';
      display: table;
      clear: both;
    }
  `;
};

export const fontMontserratRegular = () => {
  return `
    font-family: "Montserrat", Helvetica, Arial, sans-serif;
    font-weight: 400;
  `;
};

export const fontMontserratMedium = () => {
  return `
    font-family: "Montserrat", Helvetica, Arial, sans-serif;
    font-weight: 500;
  `;
};

export const fontMontserratSemibold = () => {
  return `
    font-family: "Montserrat", Helvetica, Arial, sans-serif;
    font-weight: 600;
  `;
};

export const fontSourcesansproRegular = () => {
  return `
    font-family: "Source Sans Pro", Helvetica, Arial, sans-serif;
    font-weight: 400;
  `;
};

export const fontSourcesansproSemibold = () => {
  return `
    font-family: "Source Sans Pro", Helvetica, Arial, sans-serif;
    font-weight: 600;
  `;
};

export const fontSourcesansproBold = () => {
  return `
    font-family: "Source Sans Pro", Helvetica, Arial, sans-serif;
    font-weight: 700;
  `;
};

const pxToRem = (size: number, base = 16) => {
  return (size / base) * 1 + "rem";
};

export const fontSize = (size = 16) => {
  return `
    font-size: ${size}px;
    font-size: ${pxToRem(size)};
  `;
};

export const baseStyleInput = (): SerializedStyles => {
  return css`
    ${tw`border border-solid border-grey-300 py-1 px-2 mb-2`}

    &[type="text"],
    &[type="email"] {
      ${tw`w-full`}
    }

    &::placeholder {
      ${tw`italic text-grey text-base`}
    }
  `;
};

export const buttonLarge = () => {
  return `
    padding: 8px 24px 12px;
    ${fontSize(26)};
  `;
};
