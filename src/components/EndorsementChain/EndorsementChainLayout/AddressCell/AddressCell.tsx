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
}

export const AddressCell: FunctionComponent<AddressCell> = styled(
  ({ address, className, titleEscrowAddress, newAddress }) => {
    const { identityName } = useIdentifierResolver(address);

    const tooltipContent = (
      <div className="tooltip-container">
        <div className="tooltip-tittle">Title Escrow:</div>
        <div className="tooltip-content">{titleEscrowAddress}</div>
      </div>
    );

    return (
      <div className={className}>
        <div className="relative flex">
          {newAddress && <div className="dot" data-testid="dot" />}
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
  .dot {
    ${tw`absolute h-2 w-2 rounded-full bg-teal m-1 z-10`}
    left: -16px;
    top: 3px;
  }

  .tooltip-container {
    ${tw`relative flex flex-col`}
  }

  .tooltip-tittle {
    ${tw`text-white font-bold text-base`}
  }

  .tooltip-content {
    ${tw`text-white text-base`}
  }

  .name-row {
    ${tw`relative flex items-center`}
    min-height: 27px;
  }

  .icon {
    ${tw`h-5 w-5 text-grey ml-1`}
  }

  .name {
    ${tw`text-lg text-grey-700 font-bold`}
  }

  .address {
    ${tw`text-blue mb-8`}
    word-break: break-word;
  }
`;
