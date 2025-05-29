import { LoaderSpinner } from "@tradetrust-tt/tradetrust-ui-components";
import React, { FunctionComponent } from "react";
import { Button, ButtonHeight } from "../../../Button";
import { Dropdown, DropdownItem } from "../../../Dropdown";
import { AssetManagementActions } from "./../../AssetManagementActions";

interface AssetManagementDropdownProps {
  onSetFormAction: (nextFormAction: AssetManagementActions) => void;
  canReturnToIssuer: boolean;
  canHandleShred?: boolean;
  canHandleRestore?: boolean;
  canTransferHolder: boolean;
  canTransferBeneficiary: boolean;
  canNominateBeneficiary: boolean;
  canEndorseBeneficiary: boolean;
  canTransferOwners: boolean;
  canRejectOwnerHolderTransfer: boolean;
  canRejectOwnerTransfer: boolean;
  canRejectHolderTransfer: boolean;
  isRejectPendingConfirmation?: boolean;
}

export const AssetManagementDropdown: FunctionComponent<AssetManagementDropdownProps> = ({
  onSetFormAction,
  canReturnToIssuer,
  canHandleShred,
  canHandleRestore,
  canTransferHolder,
  canTransferBeneficiary,
  canNominateBeneficiary,
  canEndorseBeneficiary,
  canTransferOwners,
  canRejectOwnerHolderTransfer,
  canRejectHolderTransfer,
  canRejectOwnerTransfer,
  isRejectPendingConfirmation,
}) => {
  return isRejectPendingConfirmation ? (
    <Button
      className="flex bg-cerulean-500 rounded-xl text-lg text-white py-2 px-3 shadow-none hover:bg-cerulean-800 w-full"
      disabled
      height={ButtonHeight.LG}
      data-testid={"rejectTransferBtn"}
    >
      <LoaderSpinner data-testid={"loader"} />
      <div className="flex-grow">Rejecting</div>
    </Button>
  ) : (
    <Dropdown
      data-testid="manageAssetDropdown"
      dropdownButtonText="Manage assets"
      className="bg-cerulean-500 font-gilroy-bold text-white rounded-xl text-lg py-2 px-3 hover:bg-cerulean-300 w-full h-12"
      classNameMenu="right-0 rounded-xl mt-2 w-full"
    >
      {canTransferHolder && (
        <DropdownItem
          className="active:bg-cloud-200 active:text-white"
          data-testid={"transferHolderDropdown"}
          onClick={() => onSetFormAction(AssetManagementActions.TransferHolder)}
        >
          Transfer holdership
        </DropdownItem>
      )}
      {canTransferBeneficiary && (
        <DropdownItem
          className="active:bg-cloud-200 active:text-white"
          data-testid={"transferOwnerDropdown"}
          onClick={() => {
            onSetFormAction(AssetManagementActions.TransferOwner);
          }}
        >
          Transfer ownership
        </DropdownItem>
      )}
      {canNominateBeneficiary && (
        <DropdownItem
          className="active:bg-cloud-200 active:text-white"
          data-testid={"nominateBeneficiaryHolderDropdown"}
          onClick={() => onSetFormAction(AssetManagementActions.NominateBeneficiary)}
        >
          Nominate transfer ownership
        </DropdownItem>
      )}
      {!canTransferBeneficiary && canEndorseBeneficiary && (
        <DropdownItem
          className="active:bg-cloud-200 active:text-white"
          data-testid={"endorseBeneficiaryDropdown"}
          onClick={() => {
            onSetFormAction(AssetManagementActions.EndorseBeneficiary);
          }}
        >
          Endorse transfer ownership
        </DropdownItem>
      )}
      {canTransferOwners && (
        <DropdownItem
          className="active:bg-cloud-200 active:text-white text-wrap"
          data-testid={"endorseTransferDropdown"}
          onClick={() => onSetFormAction(AssetManagementActions.TransferOwnerHolder)}
        >
          Transfer ownership and holdership
        </DropdownItem>
      )}
      {canReturnToIssuer && (
        <DropdownItem
          className="active:bg-cloud-200 active:text-white"
          data-testid={"surrenderDropdown"}
          onClick={() => onSetFormAction(AssetManagementActions.ReturnToIssuer)}
        >
          Return ETR to issuer
        </DropdownItem>
      )}
      {canHandleShred && (
        <DropdownItem
          className="active:bg-cloud-200 active:text-white"
          data-testid={"acceptSurrenderDropdown"}
          onClick={() => onSetFormAction(AssetManagementActions.AcceptReturnToIssuer)}
        >
          Accept ETR return
        </DropdownItem>
      )}
      {canHandleRestore && (
        <DropdownItem
          className="active:bg-cloud-200 active:text-white"
          data-testid={"rejectSurrenderDropdown"}
          onClick={() => onSetFormAction(AssetManagementActions.RejectReturnToIssuer)}
        >
          Reject ETR return
        </DropdownItem>
      )}
      {canRejectOwnerHolderTransfer && (
        <DropdownItem
          className="divide-y active:bg-cloud-200 active:text-white"
          data-testid={"rejectTransferOwnerHolderDropdown"}
          onClick={() => onSetFormAction(AssetManagementActions.RejectTransferOwnerHolder)}
        >
          Reject ownership and holdership
        </DropdownItem>
      )}
      {canRejectOwnerTransfer && (
        <DropdownItem
          className="divide-y active:bg-cloud-200 active:text-white"
          data-testid={"rejectTransferOwnerDropdown"}
          onClick={() => onSetFormAction(AssetManagementActions.RejectTransferOwner)}
        >
          Reject ownership
        </DropdownItem>
      )}
      {canRejectHolderTransfer && (
        <DropdownItem
          className="divide-y active:bg-cloud-200 active:text-white"
          data-testid={"rejectTransferHolderDropdown"}
          onClick={() => onSetFormAction(AssetManagementActions.RejectTransferHolder)}
        >
          Reject holdership
        </DropdownItem>
      )}
    </Dropdown>
  );
};
