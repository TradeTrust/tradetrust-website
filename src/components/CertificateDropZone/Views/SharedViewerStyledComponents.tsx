import styled from "@emotion/styled";
import tw from "twin.macro";
import { mixin } from "../../../styles";

export const ViewerContainer = styled.div`
  ${tw`text-center p-6 flex flex-col justify-center rounded-xl min-h-400 lg:min-h-600`}

  &.default {
    ${mixin.dropzoneStatus({ bg: "#f3f8fc", borderColor: "#0099cc" })}
  }

  &.accept {
    ${mixin.dropzoneStatus({ bg: "#f5fbf7", borderColor: "#00c04a" })}
  }

  &.warning {
    ${mixin.dropzoneStatus({ bg: "#ffe600", borderColor: "#ffbf00" })}

    .unverified-btn {
      ${tw`transition-colors duration-200 ease-out border border-solid border-yellow-600 text-white bg-yellow-600 py-2 px-6 rounded font-medium text-center align-middle min-w-135 cursor-pointer hover:border-yellow hover:bg-yellow hover:shadow-md hover:no-underline`}
    }
  }

  &.invalid {
    ${tw`text-red-400`}
    ${mixin.dropzoneStatus({ bg: "#f7d7d7", borderColor: "#e46767" })}
    
    .unverified-btn {
      ${tw`transition-colors duration-200 ease-out border border-solid border-red-400 text-white bg-red-400 py-2 px-6 rounded font-medium text-center align-middle min-w-135 cursor-pointer hover:border-red-300 hover:bg-red-300 hover:shadow-md hover:no-underline`}
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
      ${tw`text-lg mb-0 font-semibold`}
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
  ${tw`transition-colors duration-200 ease-out border border-solid border-blue text-blue bg-white py-2 px-6 rounded font-normal text-center align-middle min-w-135 cursor-pointer hover:border-blue hover:bg-blue hover:text-white hover:shadow-md hover:no-underline mt-0 mx-3 mb-3`}
`;
