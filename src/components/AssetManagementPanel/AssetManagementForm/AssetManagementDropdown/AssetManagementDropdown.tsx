import React from "react";
import { Dropdown, DropdownItem } from "@govtechsg/tradetrust-ui-components";
import { AssetManagementActions } from "./../../AssetManagementActions";

interface AssetManagementDropdownProps {
  onSetFormAction: (nextFormAction: AssetManagementActions) => void;
  canSurrender: boolean;
  canAcceptSurrender?: boolean;
  canChangeHolder: boolean;
  canEndorseBeneficiary: boolean;
  canNominateBeneficiaryHolder: boolean;
  canEndorseTransfer: boolean;
}

export const AssetManagementDropdown = ({
  onSetFormAction,
  canSurrender,
  canAcceptSurrender,
  canChangeHolder,
  canEndorseBeneficiary,
  canNominateBeneficiaryHolder,
  canEndorseTransfer,
}: AssetManagementDropdownProps) => {
  return (
    <Dropdown
      data-testid="manageAssetDropdown"
      dropdownButtonText="Manage Assets"
      alignRight
      className="rounded px-3 py-2 font-bold text-white bg-orange hover:bg-orange-dark w-40"
    >
      {canChangeHolder && (
        <DropdownItem
          className="active:bg-orange-dark active:text-white"
          data-testid={"transferHolderDropdown"}
          onClick={() => onSetFormAction(AssetManagementActions.TransferHolder)}
        >
          Transfer holdership
        </DropdownItem>
      )}
      {canEndorseBeneficiary && (
        <DropdownItem
          className="active:bg-orange-dark active:text-white"
          data-testid={"endorseBeneficiaryDropdown"}
          onClick={() => onSetFormAction(AssetManagementActions.EndorseBeneficiary)}
        >
          Endorse change of ownership
        </DropdownItem>
      )}
      {canNominateBeneficiaryHolder && (
        <DropdownItem
          className="active:bg-orange-dark active:text-white"
          data-testid={"nominateBeneficiaryHolderDropdown"}
          onClick={() => onSetFormAction(AssetManagementActions.NominateBeneficiaryHolder)}
        >
          Nominate change of ownership
        </DropdownItem>
      )}
      {canSurrender && (
        <DropdownItem
          className="active:bg-orange-dark active:text-white"
          data-testid={"surrenderDropdown"}
          onClick={() => onSetFormAction(AssetManagementActions.Surrender)}
        >
          Surrender document
        </DropdownItem>
      )}
      {canAcceptSurrender && (
        <DropdownItem
          className="active:bg-orange-dark active:text-white"
          data-testid={"acceptSurrenderDropdown"}
          onClick={() => onSetFormAction(AssetManagementActions.HandleSurrendered)}
        >
          Accept surrender of document
        </DropdownItem>
      )}
      {canEndorseTransfer && (
        <DropdownItem
          className="active:bg-orange-dark active:text-white"
          data-testid={"endorseTransferDropdown"}
          onClick={() => onSetFormAction(AssetManagementActions.EndorseTransfer)}
        >
          Endorse Transfer of ownership
        </DropdownItem>
      )}
    </Dropdown>
  );
};
