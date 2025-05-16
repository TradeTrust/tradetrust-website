import React, { useState, FunctionComponent } from "react";
import { Dropdown, DropdownItem } from "../../../Dropdown";
import { WidgetProps } from "@rjsf/core";

interface Option {
  label: string;
  value: string;
}

interface Options {
  enumOptions: Option[];
}

export const CustomDropdownWidget: FunctionComponent<WidgetProps> = (props) => {
  const { options, onChange } = props;
  const opts = options as unknown as Options;
  const [dropdownButtonText, setDropdownButtonText] = useState("Select One");

  return (
    <Dropdown
      dropdownButtonText={dropdownButtonText}
      classNameRoot="w-full"
      className="border-cloud-200 border-solid border py-2 px-3 hover:bg-cloud-100 rounded-lg"
      classNameShared="w-full"
    >
      {opts.enumOptions.map((option, index) => {
        return (
          <DropdownItem
            key={index}
            onClick={() => {
              onChange(option.value);
              setDropdownButtonText(option.label);
            }}
          >
            {option.label}
          </DropdownItem>
        );
      })}
    </Dropdown>
  );
};
