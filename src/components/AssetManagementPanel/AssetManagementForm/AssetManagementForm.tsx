import React, { FunctionComponent } from "react";
import { AssetInformationPanel } from "./../AssetInformationPanel";
import { AssetTitle } from "../AssetTitle";
import { LoaderSkeleton } from "../../UI/Loader";
import { AssetManagementActions } from "../AssetManagementContainer";
import { ButtonSolidOrange } from "../../UI/Button";
import { Dropdown } from "react-bootstrap";
import styled from "@emotion/styled";
import { mixin, vars } from "../../../styles";
// import { ManageAssetsDropdown } from "../../ManageAssets/ManageAssetsDropdown";

export const ManageAssetsDropdown = styled(() => {
  return (
    <Dropdown alignRight>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        Manage Assets
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {account === holder && (
          <>
            <Dropdown.Item onClick={() => {}}>Transfer holdership</Dropdown.Item>
            {haveApprovedAddresses && <Dropdown.Item>Confirm endorse change of beneficiary</Dropdown.Item>}
          </>
        )}
        {account === beneficiary && (
          <>
            {!haveApprovedAddresses && <Dropdown.Item onClick={() => {}}>Endorse change of beneficiary</Dropdown.Item>}
          </>
        )}
        {account === holder && userWalletAddress === beneficiary && (
          <Dropdown.Item onClick={() => {}}>Surrender document</Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
})`
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
  tokenId: string;
  tokenRegistryAddress: string;
  account?: string;
  formAction: AssetManagementActions;
  beneficiary?: string;
  holder?: string;
  surrenderingState: any;
  isConnectedToWallet: boolean;
  onConnectToWallet: () => void;
  onSurrender: () => void;
  onTransferHolder?: (nextHolder: string) => void;
  onEndorseBeneficiary?: (nextBeneficiary: string) => void; // Assuming holder is default to current holder
}

export const AssetManagementForm: FunctionComponent<AssetManagementForm> = ({
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

  return (
    <>
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
            <ManageAssetsDropdown account={account} beneficiary={beneficiary} holder={holder} />
          </div>
        ) : (
          <div className="col-auto ml-auto">
            <ButtonSolidOrange onClick={onConnectToWallet}>Connect Wallet</ButtonSolidOrange>
          </div>
        )}
      </div>
    </>
  );
};
