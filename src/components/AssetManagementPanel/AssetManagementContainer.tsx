import React, { FunctionComponent, useState, useEffect } from "react";
import { WrappedDocument } from "@govtechsg/open-attestation";
import { TitleEscrow } from "@govtechsg/token-registry/types/TitleEscrow";
import { AssetManagementTags } from "./AssetManagementTags";
import { getDocumentId, getTokenRegistryAddress } from "../../common/utils/document";
import { useTitleEscrowContract } from "../../common/hooks/useTitleEscrowContract";
import { useProviderContext } from "../../common/contexts/provider";
import { AssetInformationPanel } from "./AssetInformationPanel";
import { useContractFunctionHook, ContractFunctionState } from "@govtechsg/ethers-contract-hook";
interface ManageAssetButton {
  isProviderConnected: boolean;
  onConnectProvider: () => Promise<void>;
  canSurrender: boolean;
  onSurrender: () => void;
}

export const ManageAssetButton: FunctionComponent<ManageAssetButton> = ({
  canSurrender,
  onSurrender,
  isProviderConnected,
  onConnectProvider,
}) => {
  if (!isProviderConnected) {
    return <div onClick={onConnectProvider}>Connect Wallet</div>;
  }
  // Other functions goes here, for now, we will only be working on Surrender feature
  return canSurrender ? <div onClick={onSurrender}>Manage Asset (surrender)</div> : <div>No actions available</div>;
};

enum AssetManagementActions {
  None = "None",
  TransferHolder = "TransferHolder",
  EndorseBeneficiary = "EndorseBeneficiary",
  Surrender = "Surrender",
}

interface AssetManagementForm {
  tokenId: string;
  tokenRegistryAddress: string;
  formAction: AssetManagementActions;
  beneficiary?: string;
  holder?: string;
  surrenderingState: ContractFunctionState;
  onSurrender: () => void;
  onTransferHolder?: (nextHolder: string) => void;
  onEndorseBeneficiary?: (nextBeneficiary: string) => void; // Assuming holder is default to current holder
}

export const AssetManagementForm: FunctionComponent<AssetManagementForm> = ({
  formAction,
  tokenId,
  tokenRegistryAddress,
  onSurrender,
  surrenderingState,
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

  return (
    <>
      <div className="row">
        <div className="col-12 col-lg">
          <AssetInformationPanel tokenId={tokenId} tokenRegistryAddress={tokenRegistryAddress} />
        </div>
        <div className="col-12 col-lg">Beneficiary: {beneficiary}</div>
        <div className="col-12 col-lg">Holder: {holder}</div>
      </div>
      <div className="row">
        {surrenderingState}
        <button onClick={handleFormAction}>Surrender</button>
      </div>
    </>
  );
};

interface AssetManagementApplication {
  tokenId: string;
  tokenRegistryAddress: string;
  titleEscrow: TitleEscrow;
}

export const AssetManagementApplication: FunctionComponent<AssetManagementApplication> = ({
  tokenId,
  tokenRegistryAddress,
  titleEscrow,
}) => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.None);
  const { provider, isUpgraded, upgradeProvider, account } = useProviderContext();
  const { call: getHolder, value: holder } = useContractFunctionHook(titleEscrow, "holder");
  const { call: getBeneficiary, value: beneficiary } = useContractFunctionHook(titleEscrow, "beneficiary");
  const { send: sendSurrender, state: surrenderingState } = useContractFunctionHook(titleEscrow, "transferTo");

  const canSurrender = account === holder && account === beneficiary;
  const onSurrender = () => {
    alert("Surrendering");
    sendSurrender(tokenRegistryAddress);
  };

  useEffect(() => {
    getHolder();
    getBeneficiary();
  }, [titleEscrow]);

  return (
    <div id="title-transfer-panel">
      <div className="container-custom">
        <AssetManagementTags />
        <AssetManagementForm
          beneficiary={beneficiary}
          holder={holder}
          formAction={assetManagementAction}
          tokenId={tokenId}
          tokenRegistryAddress={tokenRegistryAddress}
          onSurrender={onSurrender}
          surrenderingState={surrenderingState}
        />
        <ManageAssetButton
          canSurrender={canSurrender}
          onSurrender={() => setAssetManagementAction(AssetManagementActions.Surrender)}
          onConnectProvider={upgradeProvider}
          isProviderConnected={isUpgraded}
        />
      </div>
    </div>
  );
};

export const AssetManagementContainer = ({ document }: { document: WrappedDocument }) => {
  const tokenId = getDocumentId(document);
  const tokenRegistryAddress = getTokenRegistryAddress(document);
  const { provider } = useProviderContext();
  const { titleEscrow } = useTitleEscrowContract(tokenRegistryAddress, tokenId, provider);

  if (!titleEscrow) return null;

  return (
    <AssetManagementApplication
      tokenId={tokenId}
      tokenRegistryAddress={tokenRegistryAddress}
      titleEscrow={titleEscrow}
    />
  );
};
