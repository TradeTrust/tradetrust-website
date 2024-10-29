import { Dropdown, DropdownItem } from "@tradetrust-tt/tradetrust-ui-components";
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
  canRejectOwnerHolderTransfer: boolean;
  canRejectOwnerTransfer: boolean;
  canRejectHolderTransfer: boolean;
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
  canRejectOwnerHolderTransfer,
  canRejectHolderTransfer,
  canRejectOwnerTransfer,
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
      {canRejectOwnerHolderTransfer && (
        <DropdownItem
          className="active:bg-cloud-200 active:text-white"
          data-testid={"rejectTransferOwnerHolderDropdown"}
          onClick={() => onSetFormAction(AssetManagementActions.RejectTransferOwnerHolder)}
        >
          Reject Ownership and Holdership
        </DropdownItem>
      )}
      {canRejectOwnerTransfer && (
        <DropdownItem
          className="active:bg-cloud-200 active:text-white"
          data-testid={"rejectTransferOwnerDropdown"}
          onClick={() => onSetFormAction(AssetManagementActions.RejectTransferOwner)}
        >
          Reject Owner
        </DropdownItem>
      )}
      {canRejectHolderTransfer && (
        <DropdownItem
          className="active:bg-cloud-200 active:text-white"
          data-testid={"rejectTransferHolderDropdown"}
          onClick={() => onSetFormAction(AssetManagementActions.RejectTransferHolder)}
        >
          Reject Holdership
        </DropdownItem>
      )}
    </Dropdown>
  );
};
