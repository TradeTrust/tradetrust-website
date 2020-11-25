import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { OverlayContext } from "../../common/contexts/OverlayContext";
import { ButtonBorderedBlue } from "../UI/Button";
import { AddressBook } from "./../../components/UI/Overlay/OverlayContent/AddressBook";

interface MultiButtonsProps {
  tokenRegistryAddress: string;
}

export const MultiButtons = ({ tokenRegistryAddress }: MultiButtonsProps) => {
  const { showOverlay } = useContext(OverlayContext);
  const onOverlayHandler = () => {
    showOverlay(<AddressBook title="Address Book" />);
  };

  return (
    <div className="container pt-2 pb-8" data-testid="multi-button">
      <div className="flex items-center">
        <div className="w-auto lg:ml-auto">
          <NavLink className="my-auto ml-auto" to="/">
            <ButtonBorderedBlue>View another</ButtonBorderedBlue>
          </NavLink>
        </div>
        {tokenRegistryAddress && (
          <div className="w-auto ml-2">
            <ButtonBorderedBlue onClick={onOverlayHandler}>Address Book</ButtonBorderedBlue>
          </div>
        )}
      </div>
    </div>
  );
};
