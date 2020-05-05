import styled from "@emotion/styled";
import React from "react";
import { Dropdown } from "react-bootstrap";
import { mixin, vars } from "../../../../styles";
import { AssetManagementActions } from "./../../AssetManagementActions";

interface ManageAssetsDropdownProps {
  onSetFormAction: (nextFormAction: AssetManagementActions) => void;
  className?: string;
  canSurrender: boolean;
  isHolder: boolean;
}

export const ManageAssetsDropdown = styled(
  ({ onSetFormAction, className, canSurrender, isHolder }: ManageAssetsDropdownProps) => {
    return (
      <Dropdown alignRight className={`${className}`}>
        <Dropdown.Toggle variant="primary" id="dropdown-basic" data-testid={"manageAssetDropdown"}>
          Manage Assets
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {isHolder && (
            <>
              <Dropdown.Item
                data-testid={"transferHolderDropdown"}
                onClick={() => onSetFormAction(AssetManagementActions.TransferHolder)}
              >
                Transfer holdership
              </Dropdown.Item>
              {/* {haveApprovedAddresses && <Dropdown.Item>Confirm endorse change of beneficiary</Dropdown.Item>} */}
            </>
          )}
          {/*
          {account === beneficiary && (
            <>
              {!haveApprovedAddresses && (
                <Dropdown.Item onClick={() => onSetFormAction(AssetManagementActions.EndorseBeneficiary)}>Endorse change of beneficiary</Dropdown.Item>
              )}
            </>
          )}
          */}
          {canSurrender && (
            <Dropdown.Item
              data-testid={"surrenderDropdown"}
              onClick={() => onSetFormAction(AssetManagementActions.Surrender)}
            >
              Surrender document
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
