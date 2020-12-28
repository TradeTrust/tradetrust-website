import styled from "@emotion/styled";
import React, { InputHTMLAttributes } from "react";
import { InputDefault } from "@govtechsg/tradetrust-ui-components";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  text: string;
}

export const Checkbox = ({ className, text, ...props }: CheckboxProps) => {
  return (
    <label className={className}>
      <div className="flex items-center">
        <div className="w-auto">
          <InputDefault type="hidden" value="No" {...props} />
          <InputDefault type="checkbox" value="Yes" {...props} />
        </div>
        <div className="flex-grow">
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
