import styled from "@emotion/styled";
import { mixin, vars } from "../../../styles";

export const InputDefault = styled.input`
  ${mixin.baseStyleInput()};
`;

interface EditableAssetTitleProps {
  errorState?: boolean;
}

export const InputEditableAssetTitle = styled.input`
  ${mixin.baseStyleInput()};
  margin-bottom: 0;
  width: 100%;
  ${({ errorState }: EditableAssetTitleProps) => errorState && `border: 1px solid ${vars.red}`};
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
