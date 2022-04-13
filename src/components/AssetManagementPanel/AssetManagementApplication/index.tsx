// import { useContractFunctionHook } from "@govtechsg/ethers-contract-hook";
import React, { FunctionComponent, useCallback, useContext, useEffect, useState } from "react";
// import { useProviderContext } from "../../../common/contexts/provider";
import { useTokenInformationContext } from "../../../common/contexts/TokenInformationContext";
// import { useTokenRegistryContract } from "../../../common/hooks/useTokenRegistryContract";
import { AssetManagementActions } from "../AssetManagementActions";
import { AssetManagementForm } from "../AssetManagementForm";
import { AssetManagementTags } from "../AssetManagementTags";
import { DocumentStatus } from "../../DocumentStatus";
import { OverlayContext } from "@govtechsg/tradetrust-ui-components";
import QRCode, { ImageSettings } from "qrcode.react";

interface AssetManagementApplicationProps {
  isMagicDemo?: boolean;
  tokenId: string;
  tokenRegistryAddress: string;
  setShowEndorsementChain: (payload: boolean) => void;
}

export const AssetManagementApplication: FunctionComponent<AssetManagementApplicationProps> = ({
  isMagicDemo,
  tokenId,
  tokenRegistryAddress,
  setShowEndorsementChain,
}) => {
  const {
    approvedHolder,
    holder,
    approvedBeneficiary,
    beneficiary,
    changeHolder,
    changeHolderState,
    endorseBeneficiary,
    endorseBeneficiaryState,
    transferTo,
    transferToState,
    destroyTokenState,
    destroyToken,
    isSurrendered,
    isTokenBurnt,
    isTitleEscrow,
    approveNewTransferTargets,
    approveNewTransferTargetsState,
    transferToNewEscrow,
    transferToNewEscrowState,
    restoreToken,
    restoreTokenState,
  } = useTokenInformationContext();

  type QRInfo = {
    transactionURI: string;
    description: string;
  };

  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.None);
  const [transactionQRInfo, setTransactionQRInfo] = useState<QRInfo | undefined>(undefined);
  // const [account, setAccount] = useState<string | undefined>();
  // const { upgradeToMetaMaskSigner, getSigner, getProvider } = useProviderContext();
  // const { getProvider } = useProviderContext();

  // const provider = getProvider();

  const onSurrender = async () => {
    const generatedTransactionURI = await transferTo({ newOwner: tokenRegistryAddress });
    setTransactionQRInfo({ transactionURI: generatedTransactionURI, description: "Surrender Document" } as QRInfo);
  };

  const onDestroyToken = async () => {
    const generatedTransactionURI = await destroyToken({ _tokenId: tokenId });
    setTransactionQRInfo({ transactionURI: generatedTransactionURI, description: "Destroy Document" } as QRInfo);
  };

  const onChangeHolder = async (...params: any[]) => {
    const generatedTransactionURI = await changeHolder({ newHolder: params[0] });
    setTransactionQRInfo({ transactionURI: generatedTransactionURI, description: "Change Holder" } as QRInfo);
  };

  const onApproveNewTransferTargets = async (...params: any[]) => {
    const generatedTransactionURI = await approveNewTransferTargets({
      newBeneficiary: params[0],
      newHolder: params[1],
    });
    setTransactionQRInfo({
      transactionURI: generatedTransactionURI,
      description: "Approve New Transfer Targets",
    } as QRInfo);
  };

  const onTransferToNewEscrow = async (...params: any[]) => {
    const generatedTransactionURI = await transferToNewEscrow({ newBeneficiary: params[0], newHolder: params[1] });
    setTransactionQRInfo({ transactionURI: generatedTransactionURI, description: "Transfer To New Escrow" } as QRInfo);
  };

  const onEndorseBeneficiary = async () => {
    const generatedTransactionURI = await endorseBeneficiary();
    setTransactionQRInfo({ transactionURI: generatedTransactionURI, description: "Endorse Beneficiary" } as QRInfo);
  };

  const onRestoreToken = (lastBeneficiary?: string, lastHolder?: string) => {
    if (!lastBeneficiary || !lastHolder) throw new Error("Ownership data is not found");
    restoreToken(lastBeneficiary, lastHolder);
    //NOT YET INTEGRATED WITH EIP
    return;
  };

  const onSetFormAction = useCallback(
    (assetManagementActions: AssetManagementActions) => {
      setAssetManagementAction(assetManagementActions);
    },
    [setAssetManagementAction]
  );

  const { showOverlay } = useContext(OverlayContext);

  const showTransactionQRModal = useCallback(
    (transactionInfo: QRInfo) => {
      console.log(transactionInfo.transactionURI);

      const imageSettings: ImageSettings = {
        src: `/static/images/logo-qrcode.png`,
        height: 50,
        width: 55,
        excavate: true,
      };

      showOverlay(
        <div className="relative flex flex-col p-5 bg-white rounded-xl shadow-lg overflow-auto h-auto max-w-6xl">
          <QRCode
            value={transactionInfo.transactionURI}
            level="Q"
            size={200}
            bgColor="#FFFFFF"
            fgColor="#000000"
            imageSettings={imageSettings}
          />
          <p style={{ textAlign: "center", paddingTop: "10px" }}>{transactionInfo.description}</p>
        </div>
      );
    },
    [showOverlay]
  );

  useEffect(() => {
    if (transactionQRInfo) {
      showTransactionQRModal(transactionQRInfo);
    }
  }, [transactionQRInfo, showTransactionQRModal]);

  return (
    <div id="title-transfer-panel">
      {assetManagementAction === AssetManagementActions.None && (
        // ui design requirement, to not show DocumentStatus & AssetManagementTags when user is on other actions
        <>
          <DocumentStatus isMagicDemo={isMagicDemo} />
          <AssetManagementTags />
        </>
      )}
      <div className="container">
        {isTitleEscrow !== undefined && (
          <AssetManagementForm
            // account={account}
            // onConnectToWallet={upgradeToMetaMaskSigner}
            beneficiary={beneficiary}
            approvedBeneficiary={approvedBeneficiary}
            holder={holder}
            approvedHolder={approvedHolder}
            formAction={assetManagementAction}
            tokenRegistryAddress={tokenRegistryAddress}
            onSetFormAction={onSetFormAction}
            surrenderingState={transferToState}
            destroyTokenState={destroyTokenState}
            onSurrender={onSurrender}
            onTransferHolder={onChangeHolder}
            holderTransferringState={changeHolderState}
            onEndorseBeneficiary={onEndorseBeneficiary}
            beneficiaryEndorseState={endorseBeneficiaryState}
            isSurrendered={isSurrendered}
            isTokenBurnt={isTokenBurnt}
            onApproveNewTransferTargets={onApproveNewTransferTargets}
            approveNewTransferTargetsState={approveNewTransferTargetsState}
            onTransferToNewEscrow={onTransferToNewEscrow}
            transferToNewEscrowState={transferToNewEscrowState}
            setShowEndorsementChain={setShowEndorsementChain}
            isTitleEscrow={isTitleEscrow}
            // isMinter={isMinter?.[0]}
            onDestroyToken={onDestroyToken}
            onRestoreToken={onRestoreToken}
            restoreTokenState={restoreTokenState}
            tokenId={tokenId}
          />
        )}
      </div>
    </div>
  );
};
