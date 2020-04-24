import React from "react";
import { useDispatch } from "react-redux";
import styled from "@emotion/styled";
import { mixin, vars } from "../../../styles";
import { Dropdown } from "react-bootstrap";
import { loadAdminAddress } from "../../../reducers/admin";
import { connectToMetamask } from "../../../services/etherjs";

interface ManageAssetsDropdownProps {
  userWalletAddress: string;
  approvedBeneficiaryAddress: string;
  approvedHolderAddress: string;
  beneficiaryAddress: string;
  holderAddress: string;
  metamaskAccountError: string;
  className?: string;
}

export const ManageAssetsDropdown = ({
  userWalletAddress,
  approvedBeneficiaryAddress,
  approvedHolderAddress,
  beneficiaryAddress,
  holderAddress,
  metamaskAccountError,
  className,
}: ManageAssetsDropdownProps) => {
  const dispatch = useDispatch();

  const haveApprovedAddresses = !!approvedBeneficiaryAddress && !!approvedHolderAddress;
  const userNotLoginMetamask = !userWalletAddress && metamaskAccountError;
  const userNoManagePrivileges =
    (userWalletAddress !== holderAddress && userWalletAddress !== beneficiaryAddress) ||
    (userWalletAddress !== holderAddress && userWalletAddress === beneficiaryAddress && haveApprovedAddresses);

  const handleSelectedTransfer = (event: { target: any }) => {
    console.log(event.target);
  };

  const handleNoAccess = () => {
    alert("User has no manage asset privileges.");
  };

  const handleConnectMetamask = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    await connectToMetamask();
    dispatch(loadAdminAddress());
  };

  return (
    <Dropdown className={`${className}`} alignRight>
      <Dropdown.Toggle
        variant="primary"
        id="dropdown-basic"
        {...(userNoManagePrivileges && { onClick: handleNoAccess })}
        {...(userNotLoginMetamask && { onClick: handleConnectMetamask })}
      >
        Manage Assets
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {userWalletAddress === holderAddress && (
          <>
            <Dropdown.Item onClick={handleSelectedTransfer}>Transfer holdership</Dropdown.Item>
            {haveApprovedAddresses && <Dropdown.Item>Confirm endorse change of beneficiary</Dropdown.Item>}
          </>
        )}
        {userWalletAddress === beneficiaryAddress && (
          <>
            {!haveApprovedAddresses && (
              <Dropdown.Item onClick={handleSelectedTransfer}>Endorse change of beneficiary</Dropdown.Item>
            )}
          </>
        )}
        {userWalletAddress === holderAddress && userWalletAddress === beneficiaryAddress && (
          <Dropdown.Item onClick={handleSelectedTransfer}>Surrender document</Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export const ManageAssetsDropdownPrimaryWhite = styled(ManageAssetsDropdown)`
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
