import styled from "@emotion/styled";
import React from "react";
import tw from "twin.macro";
import { mixin } from "../../../styles";

interface InputProps {
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  type?: string;
  value?: string | number | string[];
  placeholder?: string;
  required?: boolean;
  errorMessage?: string;
}

export const Input = ({ className, errorMessage, ...props }: InputProps) => {
  return (
    <div className={`${className} ${errorMessage ? "is-error" : ""}`}>
      <input type="text" {...props} />
      {errorMessage && <p className="message">{errorMessage}</p>}
    </div>
  );
};

export const InputDefault = styled(Input)`
  ${tw`mb-2`}

  &.is-error {
    input {
      ${tw`border border-solid border-red`}
    }

    .message {
      ${tw`text-red`}
    }
  }

  input {
    ${mixin.baseStyleInput()}
    ${tw`mb-0`}
  }

  .message {
    ${tw`my-2 mx-0`}
  }
`;

interface EditableAssetTitleProps {
  hasError?: boolean;
}

export const InputEditableAssetTitle = styled.input`
  ${mixin.baseStyleInput()}
  ${tw`mb-0`}
  min-height: 40px;
  ${({ hasError }: EditableAssetTitleProps) => hasError && tw`border-red`};
`;

export const ErrorText = styled.div`
  ${tw`w-full text-sm mt-2 text-red`}
  word-break: keep-all;
`;
