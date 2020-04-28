import React, { FunctionComponent, useState } from "react";
import { AssetInformationPanel } from "./../AssetInformationPanel";
import { AssetTitle } from "../AssetTitle";
import { LoaderSkeleton } from "../../UI/Loader";
import { AssetManagementActions } from "../AssetManagementContainer";
import { ButtonSolid, ButtonSolidRedWhite, ButtonSolidWhiteGrey, ButtonSolidOrange } from "../../UI/Button";
import { Dropdown } from "react-bootstrap";
import styled from "@emotion/styled";
import { mixin, vars } from "../../../styles";
import { SvgIcon, SvgIconArrowLeft } from "../../UI/SvgIcon";

interface ManageAssetsDropdownProps {
  account?: string;
  beneficiary?: string;
  holder?: string;
  onSetFormAction: (nextFormAction: AssetManagementActions) => void;
  className?: string;
}

export const ManageAssetsDropdown = styled(
  ({ account, beneficiary, holder, onSetFormAction, className }: ManageAssetsDropdownProps) => {
    return (
      <Dropdown className={`${className}`} alignRight data-testid={"manageAssetsDropdown"}>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          Manage Assets
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {account === holder && account === beneficiary && (
            <Dropdown.Item
              data-testid={"surrenderDropdown"}
              onClick={() => onSetFormAction(AssetManagementActions.None)}
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

interface AssetManagementForm {
  beneficiary?: string;
  holder?: string;
  approvedTransferTarget?: string;

  tokenId: string;
  tokenRegistryAddress: string;
  account?: string;
  formAction: AssetManagementActions;
  surrenderingState: any;
  isConnectedToWallet: boolean;
  onConnectToWallet: () => void;
  onSurrender: () => void;
  onSetFormAction: (nextFormAction: AssetManagementActions) => void;
  onTransferHolder?: (nextHolder: string) => void;
  onEndorseBeneficiary?: (nextBeneficiary: string) => void; // Assuming holder is default to current holder
  className?: string;
}

export const AssetManagementForm: FunctionComponent<AssetManagementForm> = styled(
  ({
    account,
    formAction,
    tokenId,
    tokenRegistryAddress,
    onSurrender,
    surrenderingState,
    isConnectedToWallet,
    onConnectToWallet,
    beneficiary,
    holder,
    className,
    onSetFormAction,
    setAssetManagementAction,
  }) => {
    // const [nextHolder, setNextHolder] = useState("");
    // const [nextBeneficiary, setNextBeneficiary] = useState("");

    const handleFormAction = () => {
      // Depending on the form type, perform different things, right now we know it's only just surrender so...
      if (formAction !== AssetManagementActions.Surrender) return alert("Only surrender is supported now");
      onSurrender();
    };

    const SkeletonPlaceholder = () => {
      return (
        <div className="mt-3 mb-4">
          <LoaderSkeleton className="mb-2" width="90px" />
          <LoaderSkeleton />
        </div>
      );
    };

    console.log(surrenderingState === "UNINITIALIZED", "!11");

    return (
      <div className={`${className}`}>
        {isConnectedToWallet && formAction === AssetManagementActions.Surrender && (
          <div className="row">
            <div className="col-12">
              <div className="action-back" onClick={() => onSetFormAction(AssetManagementActions.None)}>
                <div className="row align-items-center no-gutters">
                  <div className="col-auto mr-1">
                    <SvgIcon>
                      <SvgIconArrowLeft />
                    </SvgIcon>
                  </div>
                  <div className="col-auto">
                    <p className="mb-0">Back</p>
                  </div>
                </div>
              </div>
              <h3 className="action-title">Surrender Document</h3>
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-12 col-lg">
            <AssetInformationPanel tokenId={tokenId} tokenRegistryAddress={tokenRegistryAddress} />
          </div>
          <div className="col-12 col-lg">
            {beneficiary ? <AssetTitle role="Beneficiary" address={beneficiary} /> : <SkeletonPlaceholder />}
          </div>
          <div className="col-12 col-lg">
            {holder ? <AssetTitle role="Holder" address={holder} /> : <SkeletonPlaceholder />}
          </div>
        </div>
        <div className="row">
          <div className="col-auto">
            {surrenderingState}
            <button onClick={handleFormAction}>Surrender</button>
          </div>
          {isConnectedToWallet ? (
            <div className="col-auto ml-auto">
              {/* {surrenderingState === "UNINITIALIZED" (
            ) : (              
            )} */}
              {formAction === AssetManagementActions.Surrender && (
                <div className="row no-gutters">
                  <div className="col-auto">
                    <ButtonSolidWhiteGrey onClick={() => onSetFormAction(AssetManagementActions.None)}>
                      Cancel
                    </ButtonSolidWhiteGrey>
                  </div>
                  <div className="col-auto ml-2">
                    <ButtonSolidRedWhite onClick={handleFormAction}>Surrender</ButtonSolidRedWhite>
                  </div>
                </div>
              )}
              {formAction === AssetManagementActions.None && (
                <ManageAssetsDropdown
                  account={account}
                  beneficiary={beneficiary}
                  holder={holder}
                  onSetFormAction={onSetFormAction}
                />
              )}
            </div>
          ) : (
            <div className="col-auto ml-auto">
              <ButtonSolidOrange data-testid={"connectToWallet"} onClick={onConnectToWallet}>
                Connect Wallet
              </ButtonSolidOrange>
            </div>
          )}
        </div>
      </div>
    );
  }
)`
  .action-back {
    color: ${vars.grey};
    cursor: pointer;
    margin-bottom: 10px;
  }

  .action-title {
    ${mixin.fontSourcesansproBold};
    color: ${vars.greyDark};
    margin-bottom: 10px;
  }
`;
