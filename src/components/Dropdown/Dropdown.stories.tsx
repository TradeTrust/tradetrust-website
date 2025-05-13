import React, { ReactElement, useState } from "react";
import { Dropdown, DropdownItem } from "./Dropdown";
export default {
  title: "UI/Dropdown",
  component: Dropdown,
  parameters: {
    componentSubtitle: "Dropdown Menu",
  },
};

export const AddressBookDefault = (): ReactElement => {
  const [dropdownButtonText, setDropdownButtonText] = useState("Local");

  return (
    <Dropdown
      dropdownButtonText={dropdownButtonText}
      className="border-gray-300 border-solid border rounded-none p-3 hover:bg-gray-50"
      classNameShared="w-full max-w-sm"
    >
      <DropdownItem
        onClick={() => {
          setDropdownButtonText("Local");
        }}
      >
        Local
      </DropdownItem>
      <DropdownItem
        onClick={() => {
          setDropdownButtonText("Thirdparty endpoint");
        }}
      >
        Thirdparty endpoint
      </DropdownItem>
    </Dropdown>
  );
};

export const ButtonDefault = (): ReactElement => {
  return (
    <Dropdown
      data-testid="manageAssetDropdown"
      dropdownButtonText="Manage Assets"
      className="rounded px-3 py-2 font-gilroy-bold text-white bg-tangerine-500 hover:bg-tangerine-800"
    >
      <DropdownItem
        className="active:bg-tangerine-800 active:text-white"
        onClick={() => console.log("Transfer ownership clicked!!")}
      >
        Transfer ownership
      </DropdownItem>
      <DropdownItem
        className="active:bg-tangerine-800 active:text-white"
        onClick={() => console.log("Transfer holdership clicked!!")}
      >
        Transfer holdership
      </DropdownItem>
      <DropdownItem
        className="active:bg-tangerine-800 active:text-white"
        onClick={() => console.log("Transfer ownership and holdership clicked!!")}
      >
        Transfer ownership and holdership
      </DropdownItem>
      <DropdownItem
        className="active:bg-tangerine-800 active:text-white"
        onClick={() => console.log("Return ETR to issuer clicked!!")}
      >
        Return ETR to issuer
      </DropdownItem>
    </Dropdown>
  );
};

export const NavBarDefault = (): ReactElement => {
  return (
    <Dropdown dropdownButtonText="Info" className="font-gilroy-bold text-cloud-300 hover:none">
      <DropdownItem onClick={() => console.log("local clicked!!")}>Local</DropdownItem>
      <DropdownItem onClick={() => console.log("thirdparty clicked!!")}>Thirdparty endpoint</DropdownItem>
    </Dropdown>
  );
};

export const CustomButtonDefault = (): ReactElement => {
  return (
    <Dropdown
      className="border-gray-300 border-solid border rounded-none p-3 hover:bg-gray-50"
      dropdownButtonText={<span>Click Me</span>}
    >
      <DropdownItem onClick={() => console.log("Dropdown item 1 clicked")}>Dropdown Item 1</DropdownItem>
      <DropdownItem onClick={() => console.log("Dropdown item 2 clicked")}>Dropdown Item 2</DropdownItem>
      <DropdownItem onClick={() => console.log("Dropdown item 3 clicked")}>Dropdown Item 3</DropdownItem>
    </Dropdown>
  );
};
