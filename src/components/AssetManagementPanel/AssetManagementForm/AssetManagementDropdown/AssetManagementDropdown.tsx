import styled from "@emotion/styled";
import React from "react";
import { Dropdown } from "react-bootstrap";
import { mixin, vars } from "../../../../styles";
import { AssetManagementActions } from "./../../AssetManagementActions";

interface AssetManagementDropdownProps {
  onSetFormAction: (nextFormAction: AssetManagementActions) => void;
  className?: string;
  canSurrender: boolean;
  canAcceptSurrender: boolean;
  canChangeHolder: boolean;
  canEndorseBeneficiary: boolean;
  canNominateBeneficiaryHolder: boolean;
  canEndorseTransfer: boolean;
}

export const AssetManagementDropdown = styled(
  ({
    onSetFormAction,
    className,
    canSurrender,
    canAcceptSurrender,
    canChangeHolder,
    canEndorseBeneficiary,
    canNominateBeneficiaryHolder,
    canEndorseTransfer,
  }: AssetManagementDropdownProps) => {
    return (
      <Dropdown alignRight className={`${className}`}>
        <Dropdown.Toggle variant="primary" id="dropdown-basic" data-testid={"manageAssetDropdown"}>
          Manage Assets
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {canChangeHolder && (
            <Dropdown.Item
              data-testid={"transferHolderDropdown"}
              onClick={() => onSetFormAction(AssetManagementActions.TransferHolder)}
            >
              Transfer holdership
            </Dropdown.Item>
          )}
          {canEndorseBeneficiary && (
            <Dropdown.Item
              data-testid={"endorseBeneficiaryDropdown"}
              onClick={() => onSetFormAction(AssetManagementActions.EndorseBeneficiary)}
            >
              Endorse change of ownership
            </Dropdown.Item>
          )}
          {canNominateBeneficiaryHolder && (
            <Dropdown.Item
              data-testid={"nominateBeneficiaryHolderDropdown"}
              onClick={() => onSetFormAction(AssetManagementActions.NominateBeneficiaryHolder)}
            >
              Nominate change of ownership
            </Dropdown.Item>
          )}
          {canSurrender && (
            <Dropdown.Item
              data-testid={"surrenderDropdown"}
              onClick={() => onSetFormAction(AssetManagementActions.Surrender)}
            >
              Surrender document
            </Dropdown.Item>
          )}
          {canAcceptSurrender && (
            <Dropdown.Item
              data-testid={"acceptSurrenderDropdown"}
              onClick={() => onSetFormAction(AssetManagementActions.AcceptSurrender)}
            >
              Accept surrender of document
            </Dropdown.Item>
          )}
          {canEndorseTransfer && (
            <Dropdown.Item
              data-testid={"endorseTransferDropdown"}
              onClick={() => onSetFormAction(AssetManagementActions.EndorseTransfer)}
            >
              Endorse Transfer of ownership
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
)`
  &.show {
    > .dropdown-toggle {
      color: ${vars.white};
    }
  }

  .btn-primary {
    ${mixin.fontSourcesansproBold}
    color: ${vars.white};

    &:not(:disabled):not(.disabled):active,
    &:focus,
    &.focus,
    &:hover,
    &:active,
    &.active {
      color: ${vars.white};
    }
  }

  .dropdown-toggle {
    &::after {
      margin-left: 10px;
    }
  }

  .dropdown-item {
    padding: 8px 15px;
  }
`;
