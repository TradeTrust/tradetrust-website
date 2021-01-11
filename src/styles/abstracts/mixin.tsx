import css, { SerializedStyles } from "@emotion/css";
import tw from "twin.macro";

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
  primary = "#8f8f8f",
  secondary = "#cfcfcf",
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

export const baseStyleInput = (): SerializedStyles => {
  return css`
    ${tw`border border-solid border-grey-300 bg-white py-1 px-2 mb-2`}

    &::placeholder {
      ${tw`italic text-grey text-base`}
    }
  `;
};

export const dropzoneStatus = ({ bg = "#f3f8fc", borderColor = "#0099cc" }) => {
  return `
    background-color: ${bg};
    box-shadow: 0 0 0 10px ${bg};
    border: 2px dashed ${borderColor};
  `;
};
