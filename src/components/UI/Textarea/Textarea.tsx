import styled from "@emotion/styled";
import tw from "twin.macro";

export const TextareaDefault = styled.textarea`
  ${tw`border border-solid border-gray-300 bg-white py-1 px-2 mb-2`}
  &::placeholder {
    ${tw`italic text-gray-500 text-base`}
  }
  min-height: 140px;
  width: 100%;
  resize: none;
`;
