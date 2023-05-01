import { Dropdown, DropdownItem } from "@govtechsg/tradetrust-ui-components";
import React, { FunctionComponent } from "react";
import { AssetManagementActions } from "./../../AssetManagementActions";

interface AssetManagementDropdownProps {
  onSetFormAction: (nextFormAction: AssetManagementActions) => void;
  canSurrender: boolean;
  canHandleShred?: boolean;
  canHandleRestore?: boolean;
  canChangeHolder: boolean;
  canEndorseBeneficiary: boolean;
  canNominateBeneficiary: boolean;
  canEndorseTransfer: boolean;
}

export const AssetManagementDropdown: FunctionComponent<AssetManagementDropdownProps> = ({
  onSetFormAction,
  canSurrender,
  canHandleShred,
  canHandleRestore,
  canChangeHolder,
  canEndorseBeneficiary,
  canNominateBeneficiary,
  canEndorseTransfer,
}) => {
  return (
    <Dropdown
      data-testid="manageAssetDropdown"
      dropdownButtonText="Manage Assets"
      className="bg-cerulean-500 font-gilroy-bold text-white rounded-xl text-lg py-2 px-3 hover:bg-cerulean-300 w-30"
      classNameMenu="lg:right-0"
    >
      {canChangeHolder && (
        <DropdownItem
          className="active:bg-cloud-200 active:text-white"
          data-testid={"transferHolderDropdown"}
          onClick={() => onSetFormAction(AssetManagementActions.TransferHolder)}
        >
          Transfer Holdership
        </DropdownItem>
      )}
      {canEndorseBeneficiary && (
        <DropdownItem
          className="active:bg-cloud-200 active:text-white"
          data-testid={"endorseBeneficiaryDropdown"}
          onClick={() => {
            onSetFormAction(AssetManagementActions.EndorseBeneficiary);
          }}
        >
          Endorse Change of Ownership
        </DropdownItem>
      )}
      {canNominateBeneficiary && (
        <DropdownItem
          className="active:bg-cloud-200 active:text-white"
          data-testid={"nominateBeneficiaryHolderDropdown"}
          onClick={() => onSetFormAction(AssetManagementActions.NominateBeneficiary)}
        >
          Nominate Change of Ownership
        </DropdownItem>
      )}
      {canSurrender && (
        <DropdownItem
          className="active:bg-cloud-200 active:text-white"
          data-testid={"surrenderDropdown"}
          onClick={() => onSetFormAction(AssetManagementActions.Surrender)}
        >
          Surrender Document
        </DropdownItem>
      )}
      {canHandleShred && (
        <DropdownItem
          className="active:bg-cloud-200 active:text-white"
          data-testid={"acceptSurrenderDropdown"}
          onClick={() => onSetFormAction(AssetManagementActions.AcceptSurrendered)}
        >
          Accept Surrender of Document
        </DropdownItem>
      )}
      {canHandleRestore && (
        <DropdownItem
          className="active:bg-cloud-200 active:text-white"
          data-testid={"rejectSurrenderDropdown"}
          onClick={() => onSetFormAction(AssetManagementActions.RejectSurrendered)}
        >
          Reject Surrender of Document
        </DropdownItem>
      )}

      {canEndorseTransfer && (
        <DropdownItem
          className="active:bg-cloud-200 active:text-white"
          data-testid={"endorseTransferDropdown"}
          onClick={() => onSetFormAction(AssetManagementActions.EndorseTransfer)}
        >
          Endorse Transfer of Ownership
        </DropdownItem>
      )}
    </Dropdown>
  );
};
