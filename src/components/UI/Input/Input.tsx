import styled from "@emotion/styled";
import { mixin } from "../../../styles";

export const InputDefault = styled.input`
  ${mixin.baseStyleInput()};
`;

export const InputEditableAssetTitle = styled.input`
  ${mixin.baseStyleInput()};
  margin-bottom: 0;
  width: 100%;
`;
