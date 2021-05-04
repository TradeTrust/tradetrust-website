import { css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

const TagBaseStyle = (): SerializedStyles => {
  return css`
    ${tw`inline-block rounded mr-2 mb-2 py-1 px-2 bg-grey text-white text-lg font-semibold`}

    &:last-of-type {
      ${tw`mr-0`}
    }

    p {
      ${tw`my-0`}
    }
  `;
};

export const TagSolid = styled.div`
  ${TagBaseStyle()};
`;

export const TagSolidTeal = styled.div`
  ${TagBaseStyle()};

  ${tw`bg-teal text-white`}
`;

export const TagSolidOrange = styled.div`
  ${TagBaseStyle()};

  ${tw`bg-orange text-white`}
`;

const TagBorderedBaseStyle = (): SerializedStyles => {
  return css`
    ${TagBaseStyle()};

    ${tw`py-0 px-2 bg-white text-grey border-grey border-solid border-2`}
  `;
};

export const TagBordered = styled.div`
  ${TagBorderedBaseStyle()};
`;

export const TagBorderedRed = styled.div`
  ${TagBorderedBaseStyle()};

  ${tw`text-red border-red`}
`;

export const TagBorderedRedLarge = styled.div`
  ${TagBorderedBaseStyle()};

  ${tw`text-red border-red py-0 px-4 border-4 text-4xl m-0`}
`;
