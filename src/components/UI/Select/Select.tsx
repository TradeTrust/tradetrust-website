import React from "react";
import styled from "@emotion/styled";
import { vars, mixin } from "../../../styles";
import Select from "react-dropdown-select";

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
  background-color: ${vars.white};
  border: 1px solid ${vars.greyLight};

  input {
    font-size: inherit;
    font-style: italic;
    margin: 0;

    &::placeholder {
      color: ${vars.grey};
    }
  }

  .react-dropdown-select-dropdown-handle {
    margin: 0;
  }
`;
