import React, { ButtonHTMLAttributes, FunctionComponent } from "react";
import { Button, ButtonHeight } from "../../../Button";
import { Dropdown, DropdownItem } from "../../../Dropdown";
import { AssetManagementActions } from "./../../AssetManagementActions";
import { LoaderSpinner } from "../../../UI/Loader";

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
  canAcceptObligation?: boolean;
  canRejectObligation?: boolean;
  canDischargeObligation?: boolean;
}

interface ObligationDropdownItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "type"> {
  onClick: () => void;
}

// Additive BoE lifecycle items only — the shared DropdownItem (a non-button <div>, used by
// every classic ETR entry below) stays untouched; this variant is a real <button> so the new
// items are keyboard-operable (Tab focus, Enter/Space activation).
const ObligationDropdownItem: FunctionComponent<ObligationDropdownItemProps> = ({
  className,
  children,
  onClick,
  ...rest
}) => (
  <button
    type="button"
    className={`truncate cursor-pointer text-left text-cloud-800 p-3 hover:bg-gray-50 active:bg-gray-300 w-full ${
      className ?? ""
    }`}
    onClick={onClick}
    {...rest}
  >
    {children}
  </button>
);

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
  canAcceptObligation,
  canRejectObligation,
  canDischargeObligation,
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
      {canAcceptObligation && (
        <ObligationDropdownItem
          data-testid={"acceptObligationDropdown"}
          onClick={() => onSetFormAction(AssetManagementActions.AcceptObligation)}
        >
          Accept the bill
        </ObligationDropdownItem>
      )}
      {canRejectObligation && (
        <ObligationDropdownItem
          data-testid={"rejectObligationDropdown"}
          onClick={() => onSetFormAction(AssetManagementActions.RejectObligation)}
        >
          Reject the bill
        </ObligationDropdownItem>
      )}
      {canDischargeObligation && (
        <ObligationDropdownItem
          data-testid={"dischargeObligationDropdown"}
          onClick={() => onSetFormAction(AssetManagementActions.DischargeObligation)}
        >
          Discharge the bill
        </ObligationDropdownItem>
      )}
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
