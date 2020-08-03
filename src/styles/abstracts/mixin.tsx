import { darken } from "polished";
import * as vars from "./variables";

export const loaderSkeleton = ({
  w = "260px",
  h = "24px",
  bg = vars.greyLighter,
  loaderBg = vars.greyLightest,
  loaderW = "50%",
}) => {
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

/*
The mixin fontSize(size) is to have a fallback to px value, if rem is somehow not supported in IE. it will look like these:

supported:
font-size: 16px; (Strikethrough, succeeding font-size overwrites)
font-size: 1rem;

not supported:
font-size: 16px;
font-size: 1rem; (Strikethrough, preceding font-size used)

The default value will be 16px, if size is not defined.
*/

export const fontSize = (size = 16) => {
  return `
    font-size: ${size}px;
    font-size: ${pxToRem(size)};
  `;
};

export const baseStyleInput = () => {
  return `
    border: 1px solid ${vars.greyLight};
    padding: ${vars.inputPadding};
    margin-bottom: 10px;

    &[type="text"],
    &[type="email"] {
      width: 100%;
    }

    &::placeholder {
      font-style: italic;
      color: ${vars.grey};
      ${fontSize(16)}
    }
  `;
};
