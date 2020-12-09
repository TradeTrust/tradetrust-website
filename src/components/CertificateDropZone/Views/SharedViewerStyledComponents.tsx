import styled from "@emotion/styled";
import tw from "twin.macro";
import { mixin } from "../../../styles";

export const ViewerContainer = styled.div`
  ${tw`text-center p-6 flex flex-col justify-center rounded-xl min-h-400 lg:min-h-600`}

  &.default {
    ${tw`bg-blue-300 border-2 border-dashed border-blue shadow-md`}
  }

  &.accept {
    ${tw`bg-green-100 border-2 border-dashed border-blue shadow-md`}
  }

  &.warning {
    ${tw`bg-yellow border-2 border-dashed border-blue shadow-md text-yellow-600`}

    .unverified-btn {
      ${tw`transition duration-200 ease-out border border-solid border-yellow-600 text-white bg-yellow-600 py-2 px-6 rounded font-medium text-center align-middle min-w-135 cursor-pointer hover:border-yellow hover:bg-yellow hover:shadow-md hover:no-underline`}
    }
  }

  &.invalid {
    ${tw`bg-red-200 border-2 border-dashed border-red-400 shadow-md text-red-400`}

    .unverified-btn {
      ${tw`transition duration-200 ease-out border border-solid border-red-400 text-white bg-red-400 py-2 px-6 rounded font-medium text-center align-middle min-w-135 cursor-pointer hover:border-red-300 hover:bg-red-300 hover:shadow-md hover:no-underline`}
    }
  }

  .unverified-btn-container {
    ${tw`m-auto no-underline`}

    a {
      &:hover {
        ${tw`no-underline`}
      }
    }
  }

  .verifications {
    ${tw`mb-8`}

    .messages {
      ${mixin.fontSourcesansproBold}
      ${tw`text-lg mb-0`}
    }
  }

  .secondary-links {
    ${tw`w-1/2 flex mt-4 mx-auto mb-0`}

    span {
      ${tw`m-auto`}

      a {
        ${tw`text-sm`}
      }
    }
  }

  .text-link {
    ${tw`text-red-400 underline cursor-pointer hover:text-navy`}
  }
`;

export const ViewerButton = styled.button`
  ${tw`transition duration-200 ease-out border border-solid border-blue text-blue bg-white py-2 px-6 rounded font-medium text-center align-middle min-w-135 cursor-pointer hover:border-blue hover:bg-navy hover:shadow-md hover:no-underline mt-0 mx-3 mb-3`}
`;
