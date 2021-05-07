import styled from "@emotion/styled";
import React, { FunctionComponent } from "react";
import Select from "react-dropdown-select";
import tw from "twin.macro";
import { StyledInput } from "../../../common/styles/Input";

interface SelectOptionProps {
  value: string;
  label: string;
}

interface SelectDropdownProps {
  values: SelectOptionProps[];
  onChange: any;
  options: SelectOptionProps[];
  name: string;
  placeholder?: string;
  required: boolean;
}

export const SelectDropdown: FunctionComponent<SelectDropdownProps> = ({ values, onChange, options, ...props }) => {
  return <Select values={values} onChange={onChange} options={options} {...props} />;
};

export const SelectDefault = styled(SelectDropdown)`
  ${StyledInput()}
  font-size: 16px;

  .react-dropdown-select-input {
    font-size: inherit;
    ${tw`ml-0`}

    &::placeholder {
      ${tw`italic text-grey`}
      font-size: inherit;
    }
  }

  .react-dropdown-select-dropdown-handle {
    ${tw`m-0`}
  }
`;
