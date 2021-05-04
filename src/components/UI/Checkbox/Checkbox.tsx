import styled from "@emotion/styled";
import React, { FunctionComponent, InputHTMLAttributes } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  text: string;
}

export const Checkbox: FunctionComponent<CheckboxProps> = ({ className, text, ...props }) => {
  return (
    <label className={className}>
      <div className="flex items-center">
        <div className="w-auto">
          <input type="hidden" value="No" {...props} />
          <input type="checkbox" value="Yes" {...props} />
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
