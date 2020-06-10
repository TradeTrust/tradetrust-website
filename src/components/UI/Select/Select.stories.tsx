import React, { useState } from "react";
import { SelectDropdown, SelectDefault } from "./Select";

export default {
  title: "UI/Select",
  component: SelectDropdown,
  parameters: {
    componentSubtitle: "Selects.",
  },
};

export const Default = () => {
  const [selected, setSelected] = useState([]);
  const options = [
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "C", label: "C" },
  ];

  return (
    <SelectDefault
      values={selected}
      options={options}
      onChange={setSelected}
      name="test"
      placeholder="Select some option"
      required
    />
  );
};
