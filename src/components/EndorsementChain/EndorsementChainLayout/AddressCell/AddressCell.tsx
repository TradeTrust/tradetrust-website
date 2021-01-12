import styled from "@emotion/styled";
import { useIdentifierResolver } from "@govtechsg/address-identity-resolver";
import React, { FunctionComponent } from "react";
import { Info } from "react-feather";
import tw from "twin.macro";
import { TooltipIcon } from "../../../UI/SvgIcon";

interface AddressCell {
  address: string;
  className?: string;
  titleEscrowAddress: string;
  newAddress: boolean;
  isFirstRowHolder?: boolean;
  isLastRowHolder?: boolean;
}

export const AddressCell: FunctionComponent<AddressCell> = styled(
  ({ address, className, titleEscrowAddress, newAddress, isFirstRowHolder, isLastRowHolder }) => {
    const { identityName } = useIdentifierResolver(address);

    const tooltipContent = (
      <div className="tooltip-container">
        <div className="tooltip-tittle">Title Escrow:</div>
        <div className="tooltip-content">{titleEscrowAddress}</div>
      </div>
    );

    return (
      <div className={className}>
        <div className="journey">
          <div className={`dash-head ${isFirstRowHolder ? "invisible" : ""}`} />
          {newAddress && <div className="dot" data-testid="dot" />}
          <div className={`dash-tail ${isLastRowHolder ? "invisible" : ""}`} />
        </div>
        <div className="flex">
          {identityName && <div className="name">{identityName}</div>}
          <TooltipIcon className="icon" content={tooltipContent} placement="top">
            <Info />
          </TooltipIcon>
        </div>
        <div className="address">{address}</div>
      </div>
    );
  }
)`
  .tooltip-container {
    ${tw`relative flex flex-col`}
  }

  .tooltip-tittle {
    ${tw`text-white font-bold text-base`}
  }

  .tooltip-content {
    ${tw`text-white text-base`}
  }

  .icon {
    ${tw`h-5 w-5 text-grey ml-1`}
  }

  .name {
    ${tw`text-lg text-grey-700 font-semibold`}
  }
`;
