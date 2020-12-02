import { useThirdPartyAPIEndpoints } from "@govtechsg/address-identity-resolver";
import { AddressBook, useOverlayContext } from "@govtechsg/tradetrust-ui-components";
import React from "react";
import { NavLink } from "react-router-dom";
import { NETWORK_NAME } from "../../config";
import { ButtonBorderedBlue } from "../UI/Button";

interface MultiButtonsProps {
  tokenRegistryAddress: string;
}

export const MultiButtons = ({ tokenRegistryAddress }: MultiButtonsProps) => {
  const { showOverlay } = useOverlayContext();
  const { thirdPartyAPIEndpoints } = useThirdPartyAPIEndpoints();

  const onOverlayHandler = () => {
    showOverlay(
      <AddressBook title="Address Book" thirdPartyAPIEndpoints={thirdPartyAPIEndpoints} network={NETWORK_NAME} />
    );
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
