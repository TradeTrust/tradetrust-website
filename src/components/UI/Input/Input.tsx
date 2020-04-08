import React from "react";
import styled from "@emotion/styled";
import { mixin } from "../../../styles";

interface InputProps {
  name: string;
  type?: string;
  value?: string;
  required?: boolean;
  placeholder?: string;
}

export const Input = ({ ...props }: InputProps) => {
  return <input {...props} />;
};

export const InputDefault = styled(Input)`
  ${mixin.baseStyleInput()}
`;
