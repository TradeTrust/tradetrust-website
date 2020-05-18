import React from "react";
import styled from "@emotion/styled";
import { mixin, vars } from "../../../styles";

interface InputProps {
  className: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  placeholder?: string;
  required?: boolean;
  errorMessage?: string;
}

export const Input = ({ className, errorMessage = "", ...props }: InputProps) => {
  const isError = errorMessage !== "";

  return (
    <div className={`${className} ${isError ? "is-error" : ""}`}>
      <input type="text" {...props} />
      {isError && <p className="message">{errorMessage}</p>}
    </div>
  );
};

export const InputDefault = styled(Input)`
  &.is-error {
    input {
      border: 1px solid ${vars.red};
    }

    .message {
      color: ${vars.red};
    }
  }

  input {
    ${mixin.baseStyleInput()};
    margin-bottom: 0;
  }

  .message {
    margin: 8px 0;
  }
`;

interface EditableAssetTitleProps {
  hasError?: boolean;
}

export const InputEditableAssetTitle = styled.input`
  ${mixin.baseStyleInput()};
  margin-bottom: 0;
  width: 100%;
  ${({ hasError }: EditableAssetTitleProps) => hasError && `border: 1px solid ${vars.red}`};
`;

export const InputEditableWrapper = styled.div`
  width: 288px;
`;

export const InputError = styled.div`
  width: 100%;
  font-size: 14px;
  margin-top: 8px;
  color: ${vars.red};
  word-break: keep-all;
`;
