import React from "react";
import styled from "@emotion/styled";
import { mixin, vars } from "../../../styles";

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
  margin-bottom: 10px;

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
  min-height: 40px;
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
