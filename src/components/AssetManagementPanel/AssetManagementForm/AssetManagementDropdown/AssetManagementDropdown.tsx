import React from "react";
import styled from "@emotion/styled";
import { AssetManagementActions } from "./../../AssetManagementContainer";
import { Dropdown } from "react-bootstrap";
import { mixin, vars } from "../../../../styles";

interface ManageAssetsDropdownProps {
  onSetFormAction: (nextFormAction: AssetManagementActions) => void;
  className?: string;
  canSurrender: boolean;
}

export const ManageAssetsDropdown = styled(
  ({ onSetFormAction, className, canSurrender }: ManageAssetsDropdownProps) => {
    return (
      <Dropdown className={`${className}`} alignRight data-testid={"manageAssetsDropdown"}>
        <Dropdown.Toggle variant="primary" id="dropdown-basic" data-testid={"clickDropdown"}>
          Manage Assets
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {/*
          {account === holder && (
            <>
              <Dropdown.Item onClick={() => onSetFormAction(AssetManagementActions.TransferHolder)}>Transfer holdership</Dropdown.Item>
              {haveApprovedAddresses && <Dropdown.Item>Confirm endorse change of beneficiary</Dropdown.Item>}
            </>
          )}
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
