import React, { FunctionComponent, useState, useEffect } from "react";
import { WrappedDocument } from "@govtechsg/open-attestation";
import { TitleEscrow } from "@govtechsg/token-registry/types/TitleEscrow";
import { AssetManagementTags } from "./AssetManagementTags";
import { getDocumentId, getTokenRegistryAddress } from "../../common/utils/document";
import { useTitleEscrowContract } from "../../common/hooks/useTitleEscrowContract";
import { useProviderContext } from "../../common/contexts/provider";
import { AssetInformationPanel } from "./AssetInformationPanel";
import { useContractFunctionHook } from "@govtechsg/ethers-contract-hook";
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
  return canSurrender ? <div>Surrender</div> : <div>No actions available</div>;
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
  onSurrender: () => {};
  onTransferHolder: (nextHolder: string) => {};
  onEndorseBeneficiary: (nextBeneficiary: string) => {}; // Assuming holder is default to current holder
}

export const AssetManagementForm: FunctionComponent<AssetManagementForm> = ({ tokenId, tokenRegistryAddress }) => {
  // const [nextHolder, setNextHolder] = useState("");
  // const [nextBeneficiary, setNextBeneficiary] = useState("");

  const handleFormAction = () => {
    // Depending on the form type, perform different things
  };

  return (
    <>
      <div className="row">
        <div className="col-12 col-lg">
          <AssetInformationPanel tokenId={tokenId} tokenRegistryAddress={tokenRegistryAddress} />
        </div>
        <div className="col-12 col-lg">Editable(?) beneficiary</div>
        <div className="col-12 col-lg">Editable(?) holder</div>
      </div>
      <div className="row">
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

  const canSurrender = account === holder && account === beneficiary;

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
