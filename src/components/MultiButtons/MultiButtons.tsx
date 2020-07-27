import React, { useContext } from "react";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { ButtonBorderedBlue } from "../UI/Button";
import { OverlayContext } from "../../common/contexts/OverlayContext";
import { AddressBook } from "./../../components/UI/Overlay/OverlayContent/AddressBook";

interface MultiButtonsProps {
  className?: string;
  tokenRegistryAddress: string;
}

export const MultiButtonsUnStyled = ({ className, tokenRegistryAddress }: MultiButtonsProps) => {
  const { showOverlay } = useContext(OverlayContext);
  const onOverlayHandler = () => {
    showOverlay(<AddressBook title="Address Book" />);
  };

  return (
    <div className={`${className} container-custom py-2`} data-testid="multi-button">
      <ul className="nav nav-tabs row no-gutters align-items-center">
        <li className="nav-item col-auto col-lg-auto ml-lg-auto order-lg-2">
          <NavLink className="my-auto ml-auto" to="/">
            <ButtonBorderedBlue>View another</ButtonBorderedBlue>
          </NavLink>
        </li>
        {tokenRegistryAddress && (
          <li className="nav-item col-auto col-lg-auto ml-2 order-lg-2">
            <ButtonBorderedBlue onClick={onOverlayHandler}>Address Book</ButtonBorderedBlue>
          </li>
        )}
      </ul>
    </div>
  );
};

export const MultiButtons = styled(MultiButtonsUnStyled)`
  .nav-tabs {
    border-bottom: 0;
  }
`;
