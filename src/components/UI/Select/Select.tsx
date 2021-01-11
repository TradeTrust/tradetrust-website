import styled from "@emotion/styled";
import React from "react";
import Select from "react-dropdown-select";
import tw from "twin.macro";
import { mixin } from "../../../styles";

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

export const SelectDropdown = ({ values, onChange, options, ...props }: SelectDropdownProps) => {
  return <Select values={values} onChange={onChange} options={options} {...props} />;
};

export const SelectDefault = styled(SelectDropdown)`
  ${mixin.baseStyleInput()}
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
