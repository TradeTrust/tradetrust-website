import { css, SerializedStyles } from "@emotion/react";
import tw from "twin.macro";

export const StyledInput = (): SerializedStyles => {
  return css`
    ${tw`border border-solid border-gray-300 bg-white py-1 px-2 mb-2`}

    &::placeholder {
      ${tw`italic text-gray-500 text-base`}
    }
  `;
};
