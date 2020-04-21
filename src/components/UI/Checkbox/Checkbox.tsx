import React, { InputHTMLAttributes } from "react";
import styled from "@emotion/styled";
import { InputDefault } from "../Input";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  text: string;
}

export const Checkbox = ({ className, text, ...props }: CheckboxProps) => {
  return (
    <label className={className}>
      <div className="row no-gutters align-items-center">
        <div className="col-auto">
          <InputDefault type="hidden" value="No" {...props} />
          <InputDefault type="checkbox" value="Yes" {...props} />
        </div>
        <div className="col">
          <p>{text}</p>
        </div>
      </div>
    </label>
  );
};

export const CheckboxDefault = styled(Checkbox)`
  input,
  p {
    margin-bottom: 0;
  }

  input {
    margin-right: 8px;
  }
`;
