import React, { FunctionComponent, InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  errorMessage?: string;
}

export const Input: FunctionComponent<InputProps> = ({ className, hasError, errorMessage, ...props }) => {
  return (
    <div>
      <input
        className={`border rounded-md px-2 py-1 mb-0 focus:border-cloud-800 focus:outline-none placeholder-cloud-300 ${
          className ? className : ""
        } ${hasError || errorMessage ? "border-scarlet-500" : "border-cloud-200"}`}
        {...props}
      />
      {errorMessage && <p className="text-scarlet-500 my-2">{errorMessage}</p>}
    </div>
  );
};
