import styled from "@emotion/styled";
import React, { FunctionComponent } from "react";
import { useIdentifierResolver } from "../../../../common/hooks/useIdentifierResolver";
import { mixin, vars } from "../../../../styles";
import { SvgIconInfo, TooltipIcon } from "../../../UI/SvgIcon";

interface AddressCell {
  address: string;
  className?: string;
  titleEscrowAddress: string;
  newAddress: boolean;
}

export const AddressCell: FunctionComponent<AddressCell> = styled(
  ({ address, className, titleEscrowAddress, newAddress }) => {
    const { resolvedIdentifier } = useIdentifierResolver(address);

    const tooltipContent = (
      <div className="tooltip-container">
        <div className="tooltip-tittle">Title Escrow:</div>
        <div className="tooltop-content">{titleEscrowAddress}</div>
      </div>
    );

    return (
      <div className={className}>
        <div className="name-row">
          {newAddress && <div className="dot" data-testid="dot" />}
          {resolvedIdentifier && <div className="name">{resolvedIdentifier}</div>}
          <TooltipIcon className="icon" content={tooltipContent} placement="top">
            <SvgIconInfo />
          </TooltipIcon>
        </div>
        <div className="address">{address}</div>
      </div>
    );
  }
)`
  .dot {
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background-color: ${vars.teal};
    margin: 0.25rem;
    position: absolute;
    left: -17px;
    top: 5px;
    z-index: 4;
  }

  .tooltip-container {
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .tooltip-tittle {
    font-weight: bold;
    color: ${vars.white};
    font-size: ${mixin.fontSize(16)};
  }

  .tooltop-content {
    color: ${vars.white};
    font-size: ${mixin.fontSize(16)};
  }

  .popup {
    border: solid 1px red;
  }

  .name-row {
    display: flex;
    align-items: center;
    position: relative;
    min-height: 27px;
  }

  .icon {
    width: 18px;
    height: 18px;
    color: ${vars.grey};
    margin-left: 0.25rem;
  }

  .name {
    font-size: ${mixin.fontSize(18)};
    color: ${vars.greyDark};
    font-weight: bold;
  }

  .address {
    color: ${vars.brandBlue};
    margin-bottom: 2rem;
    word-break: break-word;
  }
`;
