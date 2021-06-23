import styled from "@emotion/styled";
import tw from "twin.macro";

export const ViewerContainer = styled.div`
  ${tw`text-center px-6 py-20 flex flex-col justify-center rounded-xl min-h-400 lg:min-h-600`}
  border-width: 2px;
  border-style: dashed;

  &.default {
    ${tw`border-cloud-100 bg-white`}
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
    ${tw`text-red-500 border-cloud-100 bg-red-100`}

    .unverified-btn {
      ${tw`transition-colors duration-200 ease-out border border-solid border-red-500 text-white bg-red-500 py-2 px-6 rounded-xl font-bold text-center align-middle min-w-135 cursor-pointer hover:border-red-300 hover:bg-red-300 hover:shadow-md hover:no-underline`}
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
  ${tw`
  transition-colors duration-200 ease-out
  shadow-lg rounded-xl 
  border border-cerulean hover:border-cerulean-300
  bg-cerulean hover:bg-cerulean-300
  font-bold
  text-white
  p-2
  mx-3
  `}
`;
