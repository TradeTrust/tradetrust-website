import styled from "@emotion/styled";
import tw from "twin.macro";

export const ViewerContainer = styled.div`
  ${tw`text-center p-6 flex flex-col justify-center rounded-xl min-h-400 lg:min-h-600`}
  border-width: 2px;
  border-style: dashed;

  &.default {
    ${tw`border-cerulean-500 bg-gray-100 shadow-default`}
  }

  &.accept {
    ${tw`border-green-400 bg-green-50 shadow-accept`}
  }

  &.warning {
    ${tw`border-yellow-500 bg-yellow-500 shadow-warning`}

    .unverified-btn {
      ${tw`transition-colors duration-200 ease-out border border-solid border-yellow-500 text-white bg-yellow-500 py-2 px-6 rounded font-medium text-center align-middle min-w-135 cursor-pointer hover:border-yellow-200 hover:bg-yellow-200 hover:shadow-md hover:no-underline`}
    }
  }

  &.invalid {
    ${tw`text-red-500 border-red-500 bg-red-200 shadow-invalid`}

    .unverified-btn {
      ${tw`transition-colors duration-200 ease-out border border-solid border-red-500 text-white bg-red-500 py-2 px-6 rounded font-medium text-center align-middle min-w-135 cursor-pointer hover:border-red-300 hover:bg-red-300 hover:shadow-md hover:no-underline`}
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
    ${tw`text-red-500 underline cursor-pointer hover:text-gray-500`}
  }
`;

export const ViewerButton = styled.button`
  ${tw`transition-colors duration-200 ease-out border border-solid border-cerulean-500 text-cerulean-500 bg-white py-2 px-6 rounded font-normal text-center align-middle min-w-135 cursor-pointer hover:border-cerulean-500 hover:bg-cerulean-500 hover:text-white hover:shadow-md hover:no-underline mt-0 mx-3 mb-3`}
`;
