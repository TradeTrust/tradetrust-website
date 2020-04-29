import React from "react";
// import { AssetInformationPanel } from "./../AssetInformationPanel";
// import { AssetTitle } from "../AssetTitle";
import { LoaderSkeleton } from "../../UI/Loader";
import { AssetManagementActions } from "../AssetManagementContainer";
// import { ButtonSolidGreenWhite, ButtonSolidRedWhite, ButtonSolidWhiteGrey, ButtonSolidOrange } from "../../UI/Button";
// import { Dropdown } from "react-bootstrap";
// import styled from "@emotion/styled";
// import { mixin, vars } from "../../../styles";
// import { SvgIcon, SvgIconArrowLeft } from "../../UI/SvgIcon";
// import { LoaderSpinner } from "../../UI/Loader";
import { SurrenderForm } from "./FormVariants/SurrenderForm";
import { ActionSelectionForm } from "./FormVariants/ActionSelectionForm";

interface AssetManagementFormProps {
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
}

export const AssetManagementForm = ({
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
  onSetFormAction,
}: AssetManagementFormProps) => {
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

  const isHolder = account === holder;
  const isBeneficiary = account === beneficiary;
  const canSurrender = isBeneficiary && isHolder;

  if (formAction === AssetManagementActions.Surrender)
    return (
      <SurrenderForm
        isConnectedToWallet={isConnectedToWallet}
        formAction={formAction}
        onSetFormAction={onSetFormAction}
        tokenId={tokenId}
        tokenRegistryAddress={tokenRegistryAddress}
        beneficiary={beneficiary}
        holder={holder}
        account={account}
        canSurrender={canSurrender}
        surrenderingState={surrenderingState}
        handleFormAction={handleFormAction}
        onConnectToWallet={onConnectToWallet}
        SkeletonPlaceholder={SkeletonPlaceholder}
      />
    );
  return (
    <ActionSelectionForm
      isConnectedToWallet={isConnectedToWallet}
      formAction={formAction}
      onSetFormAction={onSetFormAction}
      tokenId={tokenId}
      tokenRegistryAddress={tokenRegistryAddress}
      beneficiary={beneficiary}
      holder={holder}
      account={account}
      canSurrender={canSurrender}
      surrenderingState={surrenderingState}
      handleFormAction={handleFormAction}
      onConnectToWallet={onConnectToWallet}
      SkeletonPlaceholder={SkeletonPlaceholder}
    />
  );

  // return (
  //   <div className="row py-3">
  //     <div className="col-12">
  //       {isConnectedToWallet && formAction !== AssetManagementActions.None && (
  //         <AssetManagementTitle formAction={formAction} onSetFormAction={onSetFormAction} />
  //       )}
  //       <div className="row mb-3">
  //         <div className="col-12 col-lg">
  //           <AssetInformationPanel tokenId={tokenId} tokenRegistryAddress={tokenRegistryAddress} />
  //         </div>
  //         <div className="col-12 col-lg">
  //           {beneficiary ? <AssetTitle role="Beneficiary" address={beneficiary} /> : <SkeletonPlaceholder />}
  //         </div>
  //         <div className="col-12 col-lg">
  //           {holder ? <AssetTitle role="Holder" address={holder} /> : <SkeletonPlaceholder />}
  //         </div>
  //       </div>
  //       <div className="row mb-3">
  //         {isConnectedToWallet ? (
  //           <div className="col-auto ml-auto">
  //             {formAction === AssetManagementActions.None ? (
  //               <>
  //                 {account !== beneficiary && account !== holder ? (
  //                   <ButtonSolidOrange
  //                     onClick={() => {
  //                       alert("Your wallet address has no manage assets privileges.");
  //                     }}
  //                   >
  //                     No Access
  //                   </ButtonSolidOrange>
  //                 ) : (
  //                   <ManageAssetsDropdown
  //                     account={account}
  //                     beneficiary={beneficiary}
  //                     holder={holder}
  //                     onSetFormAction={onSetFormAction}
  //                     canSurrender={canSurrender}
  //                   />
  //                 )}
  //               </>
  //             ) : (
  //               <>
  //                 {surrenderingState === "CONFIRMED" ? (
  //                   <div className="row">
  //                     <div className="col-auto">
  //                       <ButtonSolidGreenWhite
  //                         onClick={() => {
  //                           onSetFormAction(AssetManagementActions.None);
  //                         }}
  //                       >
  //                         Success
  //                       </ButtonSolidGreenWhite>
  //                     </div>
  //                   </div>
  //                 ) : (
  //                   <div className="row no-gutters">
  //                     <div className="col-auto">
  //                       <ButtonSolidWhiteGrey
  //                         onClick={() => onSetFormAction(AssetManagementActions.None)}
  //                         disabled={surrenderingState === "PENDING_CONFIRMATION"}
  //                       >
  //                         Cancel
  //                       </ButtonSolidWhiteGrey>
  //                     </div>
  //                     <div className="col-auto ml-2">
  //                       <ButtonSolidRedWhite
  //                         onClick={handleFormAction}
  //                         disabled={surrenderingState === "PENDING_CONFIRMATION"}
  //                       >
  //                         {surrenderingState === "PENDING_CONFIRMATION" ? (
  //                           <LoaderSpinner />
  //                         ) : (
  //                           <>
  //                             {formAction === AssetManagementActions.Surrender && <>Surrender Document</>}
  //                             {formAction === AssetManagementActions.TransferHolder && <>Transfer Holdership</>}
  //                             {formAction === AssetManagementActions.EndorseBeneficiary && (
  //                               <>Endorse Change of Beneficiary</>
  //                             )}
  //                           </>
  //                         )}
  //                       </ButtonSolidRedWhite>
  //                     </div>
  //                   </div>
  //                 )}
  //               </>
  //             )}
  //           </div>
  //         ) : (
  //           <div className="col-auto ml-auto">
  //             <ButtonSolidOrange data-testid={"connectToWallet"} onClick={onConnectToWallet}>
  //               Connect Wallet
  //             </ButtonSolidOrange>
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //   </div>
  // );
};
