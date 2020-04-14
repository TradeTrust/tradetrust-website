import styled from "@emotion/styled";
import { mixin } from "../../../styles";

export const TextareaDefault = styled.textarea`
  ${mixin.baseStyleInput()}

  min-height: 140px;
  width: 100%;
  resize: none;
`;
