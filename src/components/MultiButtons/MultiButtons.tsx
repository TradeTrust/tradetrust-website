import styled from "@emotion/styled";
import { useThirdPartyAPIEndpoints } from "@govtechsg/address-identity-resolver";
import { AddressBook, ButtonBorderedBlue, OverlayContext } from "@govtechsg/tradetrust-ui-components";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { NETWORK } from "../../config";

interface MultiButtonsProps {
  className?: string;
  tokenRegistryAddress: string;
}

export const MultiButtonsUnStyled = ({ className, tokenRegistryAddress }: MultiButtonsProps) => {
  const { showOverlay } = useContext(OverlayContext);
  const { thirdPartyAPIEndpoints } = useThirdPartyAPIEndpoints();

  const onOverlayHandler = () => {
    showOverlay(<AddressBook title="Address Book" network={NETWORK} thirdPartyAPIEndpoints={thirdPartyAPIEndpoints} />);
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
