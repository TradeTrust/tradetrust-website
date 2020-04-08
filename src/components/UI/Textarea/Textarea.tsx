import React from "react";
import styled from "@emotion/styled";
import { mixin } from "../../../styles";

interface TextareaProps {
  name: string;
  placeholder?: string;
  required?: boolean;
}

export const Textarea = ({ ...props }: TextareaProps) => {
  return <textarea {...props} />;
};

export const TextareaDefault = styled(Textarea)`
  ${mixin.baseStyleInput()}

  min-height: 140px;
  width: 100%;
  resize: none;
`;
