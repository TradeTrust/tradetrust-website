import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import { OverlayContext } from "../../../../../common/contexts/OverlayContext";
import { FormState } from "../../../../../constants/FormState";
import { isEthereumAddress } from "../../../../../utils";
import { MessageTitle, showDocumentTransferMessage } from "../../../../UI/Overlay/OverlayContent";
import { TagBordered } from "../../../../UI/Tag";
import { AssetManagementActions } from "../../../AssetManagementActions";
import { FooterActionButtons } from "../../FooterActionButtons";
import { EditableAssetTitle } from "./../EditableAssetTitle";
import { Button } from "../../../../Button";
import { LoaderSpinner } from "../../../../UI/Loader";

// Base Props shared by all form variants
export interface BaseActionFormProps {
  type: Omit<AssetManagementActions, "None">;
  beneficiary: string;
  holder: string;
  keyId?: string;
  isExpired?: boolean;
  setFormActionNone: () => void;
  setShowEndorsementChain: (payload: boolean) => void;
}

// Props for TransferHolderForm
export interface TransferHolderFormProps extends BaseActionFormProps {
  type: AssetManagementActions.TransferHolder;
  handleTransfer: ({ holderAddress, remarks }: { holderAddress: string; remarks: string }) => void;
  holderTransferringState: string;
}

// Props for TransferOwnerForm
export interface TransferOwnerFormProps extends BaseActionFormProps {
  type: AssetManagementActions.TransferOwner;
  handleBeneficiaryTransfer: ({
    newBeneficiaryAddress,
    remarks,
  }: {
    newBeneficiaryAddress: string;
    remarks: string;
  }) => void;
  beneficiaryEndorseState: string;
}

// Props for TransferOwnerHolderForm
export interface TransferOwnerHolderFormProps extends BaseActionFormProps {
  type: AssetManagementActions.TransferOwnerHolder;
  handleEndorseTransfer: ({
    newBeneficiaryAddress,
    newHolderAddress,
    remarks,
  }: {
    newBeneficiaryAddress: string;
    newHolderAddress: string;
    remarks: string;
  }) => void;
  transferOwnersState: string;
}

// Props for NominateBeneficiaryForm
export interface NominateBeneficiaryFormProps extends BaseActionFormProps {
  type: AssetManagementActions.NominateBeneficiary;
  handleNomination: ({ newBeneficiaryAddress, remarks }: { newBeneficiaryAddress: string; remarks: string }) => void;
  nominationState: string;
}

// Props for EndorseBeneficiaryForm
export interface EndorseBeneficiaryProps extends BaseActionFormProps {
  type: AssetManagementActions.EndorseBeneficiary;
  nominee?: string;
  handleBeneficiaryTransfer: ({
    newBeneficiaryAddress,
    remarks,
  }: {
    newBeneficiaryAddress: string;
    remarks: string;
  }) => void;
  beneficiaryEndorseState: string;
}

// Props for SurrenderForm
export interface SurrenderFormProps extends BaseActionFormProps {
  type: AssetManagementActions.ReturnToIssuer;
  handleReturnToIssuer: ({ remarks }: { remarks: string }) => void;
  returnToIssuerState: string;
}

// Props for AcceptSurrenderedForm
export interface AcceptSurrenderedFormProps extends BaseActionFormProps {
  type: AssetManagementActions.AcceptReturnToIssuer;
  handleDestroyToken: (remark: string) => void;
  destroyTokenState: string;
}

// Props for RejectSurrenderedForm
export interface RejectSurrenderedFormProps extends BaseActionFormProps {
  type: AssetManagementActions.RejectReturnToIssuer;
  handleRestoreToken: (remark: string) => void;
  restoreTokenState: string;
}

// Props for RejectTransferOwnerHolderForm
export interface RejectTransferOwnerHolderFormProps extends BaseActionFormProps {
  type: AssetManagementActions.RejectTransferOwnerHolder;
  handleRejectTransferOwnerHolder: ({ remark }: { remark: string }) => void;
  rejectTransferOwnerHolderState: string;
}

// Props for RejectTransferOwnerForm
export interface RejectTransferOwnerFormProps extends BaseActionFormProps {
  type: AssetManagementActions.RejectTransferOwner;
  handleRejectTransferOwner: ({ remark }: { remark: string }) => void;
  rejectTransferOwnerState: string;
}

// Props for RejectTransferHolderForm
export interface RejectTransferHolderFormProps extends BaseActionFormProps {
  type: AssetManagementActions.RejectTransferHolder;
  handleRejectTransferHolder: ({ remark }: { remark: string }) => void;
  rejectTransferHolderState: string;
}

// Union type for all possible props
type ActionFormProps =
  | TransferHolderFormProps
  | TransferOwnerFormProps
  | TransferOwnerHolderFormProps
  | NominateBeneficiaryFormProps
  | EndorseBeneficiaryProps
  | SurrenderFormProps
  | AcceptSurrenderedFormProps
  | RejectSurrenderedFormProps
  | RejectTransferOwnerHolderFormProps
  | RejectTransferOwnerFormProps
  | RejectTransferHolderFormProps;

export const ActionForm: FunctionComponent<ActionFormProps> = (props) => {
  const { type, beneficiary, holder, isExpired, setFormActionNone, setShowEndorsementChain } = props;
  const [remark, setRemark] = useState("");
  const { closeOverlay, showOverlay } = useContext(OverlayContext);

  // Additional state variables for different form types
  const [newHolder, setNewHolder] = useState(holder || "");
  const [newOwner, setNewOwner] = useState(holder || "");
  const [newBeneficiary, setNewBeneficiary] = useState("");

  // RejectSurrenderForm specific function
  const onClickRejectSurrender = () => {
    if (type === AssetManagementActions.RejectReturnToIssuer) {
      const { handleRestoreToken } = props;
      showOverlay(
        showDocumentTransferMessage(
          MessageTitle.CONFIRM_REJECT_SURRENDER_DOCUMENT,
          {
            isSuccess: true,
            beneficiaryAddress: beneficiary,
            holderAddress: holder,
            isConfirmationMessage: true,
            onConfirmationAction: () => handleRestoreToken(remark),
          },
          <FooterActionButtons setShowEndorsementChain={setShowEndorsementChain} closeOverlay={closeOverlay} />
        )
      );
    }
  };

  // All useEffect hooks moved outside of the switch statement
  useEffect(() => {
    // Handle SurrenderForm confirmation
    if (type === AssetManagementActions.ReturnToIssuer) {
      const { returnToIssuerState } = props;
      const isConfirmed = returnToIssuerState === FormState.CONFIRMED;

      if (isConfirmed) {
        showOverlay(
          showDocumentTransferMessage(
            MessageTitle.SURRENDER_DOCUMENT_SUCCESS,
            { isSuccess: true },
            <FooterActionButtons setShowEndorsementChain={setShowEndorsementChain} closeOverlay={closeOverlay} />
          )
        );
        setFormActionNone();
      }
    }

    // Handle EndorseBeneficiaryForm confirmation
    if (type === AssetManagementActions.EndorseBeneficiary) {
      const { nominee, beneficiaryEndorseState } = props;
      const isConfirmed = beneficiaryEndorseState === FormState.CONFIRMED;

      if (isConfirmed) {
        showOverlay(
          showDocumentTransferMessage(
            MessageTitle.CHANGE_BENEFICIARY_SUCCESS,
            {
              isSuccess: true,
              beneficiaryAddress: nominee,
            },
            <FooterActionButtons setShowEndorsementChain={setShowEndorsementChain} closeOverlay={closeOverlay} />
          )
        );
        setFormActionNone();
      }
    }

    // Handle AcceptSurrenderedForm confirmation
    if (type === AssetManagementActions.AcceptReturnToIssuer) {
      const { destroyTokenState } = props;
      const isDestroyTokenConfirmed = destroyTokenState === FormState.CONFIRMED;

      if (isDestroyTokenConfirmed) {
        showOverlay(
          showDocumentTransferMessage(
            MessageTitle.ACCEPT_SURRENDER_DOCUMENT,
            { isSuccess: true },
            <FooterActionButtons setShowEndorsementChain={setShowEndorsementChain} closeOverlay={closeOverlay} />
          )
        );
        setFormActionNone();
      }
    }

    // Handle RejectSurrenderedForm confirmation
    if (type === AssetManagementActions.RejectReturnToIssuer) {
      const { restoreTokenState } = props;
      const isRestoreTokenConfirmed = restoreTokenState === FormState.CONFIRMED;

      if (isRestoreTokenConfirmed) {
        showOverlay(
          showDocumentTransferMessage(
            MessageTitle.REJECT_SURRENDER_DOCUMENT,
            { isSuccess: true },
            <FooterActionButtons setShowEndorsementChain={setShowEndorsementChain} closeOverlay={closeOverlay} />
          )
        );
        setFormActionNone();
      }
    }

    // Handle EndorseTransferForm confirmation
    if (type === AssetManagementActions.TransferOwnerHolder) {
      const { transferOwnersState } = props;
      const isConfirmed = transferOwnersState === FormState.CONFIRMED;

      if (isConfirmed) {
        showOverlay(
          showDocumentTransferMessage(
            MessageTitle.ENDORSE_TRANSFER_SUCCESS,
            {
              isSuccess: true,
              beneficiaryAddress: newOwner,
              holderAddress: newHolder,
            },
            <FooterActionButtons setShowEndorsementChain={setShowEndorsementChain} closeOverlay={closeOverlay} />
          )
        );
        setFormActionNone();
      }
    }

    // Handle NominateBeneficiaryForm confirmation
    if (type === AssetManagementActions.NominateBeneficiary) {
      const { nominationState } = props;
      const isConfirmed = nominationState === FormState.CONFIRMED;

      if (isConfirmed) {
        showOverlay(
          showDocumentTransferMessage(
            MessageTitle.NOMINATE_BENEFICIARY_HOLDER_SUCCESS,
            {
              isSuccess: true,
            },
            <FooterActionButtons setShowEndorsementChain={setShowEndorsementChain} closeOverlay={closeOverlay} />
          )
        );
        setFormActionNone();
      }
    }

    // Handle TransferHolderForm confirmation
    if (type === AssetManagementActions.TransferHolder) {
      const { holderTransferringState } = props;
      const isConfirmed = holderTransferringState === FormState.CONFIRMED;

      if (isConfirmed) {
        showOverlay(
          showDocumentTransferMessage(
            MessageTitle.TRANSFER_HOLDER_SUCCESS,
            {
              isSuccess: true,
              holderAddress: newHolder,
            },
            <FooterActionButtons setShowEndorsementChain={setShowEndorsementChain} closeOverlay={closeOverlay} />
          )
        );
        setFormActionNone();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props, showOverlay, setFormActionNone, beneficiary, holder, newBeneficiary, newHolder, newOwner, remark, type]);

  // Switch based on form type to handle specific UI rendering
  switch (type) {
    case AssetManagementActions.ReturnToIssuer: {
      const { handleReturnToIssuer, returnToIssuerState } = props;
      const isPendingConfirmation = returnToIssuerState === FormState.PENDING_CONFIRMATION;

      return (
        <>
          <div className="flex-1 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 grid-flow-row gap-2 bg-cerulean-50 p-4 rounded-lg">
            <div className="col-span-1">
              <EditableAssetTitle role="Owner" value={beneficiary} isEditable={false} />
            </div>
            <div className="col-span-1">
              <EditableAssetTitle role="Holder" value={holder} isEditable={false} />
            </div>
            <div className="col-span-1 xs:col-span-2 sm:col-span-1">
              <EditableAssetTitle
                role="Remark"
                value="Remark"
                newValue={remark}
                onSetNewValue={setRemark}
                isEditable={true}
                isRemark={true}
                isSubmitted={isPendingConfirmation}
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col flex-wrap xs:flex-row xs:flex-nowrap justify-between pb-4 gap-2">
            <div className="flex-1 content-center" />
            <div className="gap-2 xs:ml-auto xs:min-w-48 xs:w-auto w-full flex flex-col xs:flex-row">
              <div className="w-full xs:min-w-48 xs:max-w-64">
                <Button
                  className="w-full bg-white rounded-xl text-lg py-2 px-3 border-cloud-100 text-cloud-800 shadow-none hover:bg-cloud-200"
                  onClick={setFormActionNone}
                  disabled={isPendingConfirmation}
                  data-testid={"cancelSurrenderBtn"}
                >
                  Cancel
                </Button>
              </div>
              <div className="w-full xs:min-w-48 xs:max-w-64">
                <Button
                  className="w-full bg-cerulean-500 rounded-xl text-lg text-white py-2 px-3 shadow-none hover:bg-cerulean-800 flex justify-center items-center"
                  onClick={() => handleReturnToIssuer({ remarks: remark })}
                  disabled={isPendingConfirmation}
                  data-testid={"surrenderBtn"}
                >
                  {isPendingConfirmation ? <LoaderSpinner data-testid={"loader"} /> : <>Return ETR</>}
                </Button>
              </div>
            </div>
          </div>
        </>
      );
    }

    case AssetManagementActions.AcceptReturnToIssuer: {
      const { handleDestroyToken, destroyTokenState } = props;
      const isDestroyTokenPendingConfirmation = destroyTokenState === FormState.PENDING_CONFIRMATION;

      return (
        <>
          <div className="flex-1 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 grid-flow-row gap-2 bg-cerulean-50 p-4 rounded-lg">
            <div className="col-span-1 xs:col-span-2 sm:col-end-4 sm:col-span-1">
              <EditableAssetTitle
                role="Remark"
                value="Remark"
                newValue={remark}
                onSetNewValue={setRemark}
                isEditable={true}
                isRemark={true}
                isSubmitted={isDestroyTokenPendingConfirmation}
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col flex-wrap md:flex-row md:flex-nowrap justify-between gap-2">
            <div className="flex-1 content-center space-y-2 md:space-x-2 md:space-y-0">
              {isExpired && (
                <TagBordered
                  id="expired-sign"
                  rounded="rounded-full"
                  className="border-scarlet-100 bg-scarlet-100 text-scarlet-500 content-center justify-self-center w-full xs:w-auto h-10 px-4 py-2"
                >
                  <h5 data-testid="expiredDoc" className="text-center break-keep">
                    Expired
                  </h5>
                </TagBordered>
              )}
              <TagBordered
                id="surrender-sign"
                rounded="rounded-full"
                className="border-scarlet-100 bg-scarlet-100 text-scarlet-500 content-center justify-self-center w-full xs:w-auto h-10 px-4 py-2"
              >
                <h5 data-testid="surrenderToIssuer" className="text-center break-keep">
                  ETR returned to Issuer
                </h5>
              </TagBordered>
            </div>
            <div className="gap-2 xs:ml-auto xs:min-w-48 xs:w-auto w-full flex flex-col xs:flex-row">
              <div className="w-full xs:min-w-48 xs:max-w-64">
                <Button
                  className="w-full bg-white rounded-xl text-lg py-2 px-3 border-cloud-100 text-cloud-800 shadow-none hover:bg-cloud-200"
                  onClick={setFormActionNone}
                  disabled={isDestroyTokenPendingConfirmation}
                  data-testid={"cancelSurrenderBtn"}
                >
                  Cancel
                </Button>
              </div>
              <div className="w-full xs:min-w-48 xs:max-w-64">
                <Button
                  className="w-full bg-cerulean-500 rounded-xl text-lg text-white py-2 px-3 shadow-none hover:bg-cerulean-800 flex justify-center items-center"
                  onClick={() => handleDestroyToken(remark)}
                  disabled={isDestroyTokenPendingConfirmation}
                  data-testid={"acceptSurrenderBtn"}
                >
                  {isDestroyTokenPendingConfirmation ? (
                    <LoaderSpinner data-testid={"accept-loader"} />
                  ) : (
                    <>Accept ETR Return</>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </>
      );
    }

    case AssetManagementActions.RejectReturnToIssuer: {
      const { restoreTokenState } = props;
      const isRestoreTokenPendingConfirmation = restoreTokenState === FormState.PENDING_CONFIRMATION;

      return (
        <>
          <div className="flex-1 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 grid-flow-row gap-2 bg-cerulean-50 p-4 rounded-lg">
            <div className="col-span-1 xs:col-span-2 sm:col-end-4 sm:col-span-1">
              <EditableAssetTitle
                role="Remark"
                value="Remark"
                newValue={remark}
                onSetNewValue={setRemark}
                isEditable={true}
                isRemark={true}
                isSubmitted={isRestoreTokenPendingConfirmation}
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col flex-wrap md:flex-row md:flex-nowrap justify-between gap-2">
            <div className="flex-1 content-center space-y-2 md:space-x-2 md:space-y-0">
              {isExpired && (
                <TagBordered
                  id="expired-sign"
                  rounded="rounded-full"
                  className="border-scarlet-100 bg-scarlet-100 text-scarlet-500 content-center justify-self-center w-full xs:w-auto h-10 px-4 py-2"
                >
                  <h5 data-testid="expiredDoc" className="text-center break-keep">
                    Expired
                  </h5>
                </TagBordered>
              )}
              <TagBordered
                id="surrender-sign"
                rounded="rounded-full"
                className="border-scarlet-100 bg-scarlet-100 text-scarlet-500 content-center justify-self-center w-full xs:w-auto h-10 px-4 py-2"
              >
                <h5 data-testid="surrenderToIssuer" className="text-center break-keep">
                  ETR returned to Issuer
                </h5>
              </TagBordered>
            </div>
            <div className="gap-2 xs:ml-auto xs:min-w-48 xs:w-auto w-full flex flex-col xs:flex-row">
              <div className="w-full xs:min-w-48 xs:max-w-64">
                <Button
                  className="w-full bg-white rounded-xl text-lg py-2 px-3 border-cloud-100 text-cloud-800 shadow-none hover:bg-cloud-200"
                  onClick={setFormActionNone}
                  disabled={isRestoreTokenPendingConfirmation}
                  data-testid={"cancelSurrenderBtn"}
                >
                  Cancel
                </Button>
              </div>
              <div className="w-full xs:min-w-48 xs:max-w-64">
                <Button
                  className="w-full bg-cerulean-500 rounded-xl text-lg text-white py-2 px-3 shadow-none hover:bg-cerulean-800 flex justify-center items-center"
                  onClick={onClickRejectSurrender}
                  disabled={isRestoreTokenPendingConfirmation}
                  data-testid={"rejectSurrenderBtn"}
                >
                  {isRestoreTokenPendingConfirmation ? (
                    <LoaderSpinner data-testid={"reject-loader"} />
                  ) : (
                    <>Reject ETR Return</>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </>
      );
    }

    case AssetManagementActions.NominateBeneficiary: {
      const { handleNomination, nominationState } = props;
      const isPendingConfirmation = nominationState === FormState.PENDING_CONFIRMATION;
      const isEditable = nominationState !== FormState.PENDING_CONFIRMATION && nominationState !== FormState.CONFIRMED;

      const isInvalidNomination =
        !newBeneficiary || !holder || newBeneficiary === beneficiary || !isEthereumAddress(newBeneficiary);

      return (
        <>
          <div className="flex-1 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 grid-flow-row gap-2 bg-cerulean-50 p-4 rounded-lg">
            <div className="col-span-1">
              <EditableAssetTitle
                role="Owner"
                value={beneficiary}
                newValue={newBeneficiary}
                isEditable={isEditable}
                onSetNewValue={setNewBeneficiary}
                isError={nominationState === FormState.ERROR}
              />
            </div>
            <div className="col-span-1">
              <EditableAssetTitle role="Holder" value={holder} isEditable={false} />
            </div>
            <div className="col-span-1 xs:col-span-2 sm:col-span-1">
              <EditableAssetTitle
                role="Remark"
                value="Remark"
                newValue={remark}
                onSetNewValue={setRemark}
                isEditable={true}
                isRemark={true}
                isSubmitted={isPendingConfirmation}
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col flex-wrap xs:flex-row xs:flex-nowrap justify-between pb-4 gap-2">
            <div className="flex-1 content-center" />
            <div className="gap-2 xs:ml-auto xs:min-w-48 xs:w-auto w-full flex flex-col xs:flex-row">
              <div className="w-full xs:min-w-48 xs:max-w-64">
                <Button
                  className="w-full bg-white rounded-xl text-lg py-2 px-3 border-cloud-100 text-cloud-800 shadow-none hover:bg-cloud-200"
                  onClick={setFormActionNone}
                  disabled={isPendingConfirmation}
                  data-testid={"cancelNominationBtn"}
                >
                  Cancel
                </Button>
              </div>
              <div className="w-full xs:min-w-48 xs:max-w-64">
                <Button
                  className="w-full bg-cerulean-500 rounded-xl text-lg text-white py-2 px-3 shadow-none hover:bg-cerulean-800 flex justify-center items-center"
                  disabled={isInvalidNomination || isPendingConfirmation}
                  onClick={() => {
                    handleNomination({
                      newBeneficiaryAddress: newBeneficiary,
                      remarks: remark,
                    });
                  }}
                  data-testid={"nominationBtn"}
                >
                  {isPendingConfirmation ? <LoaderSpinner data-testid={"loader"} /> : <>Nominate</>}
                </Button>
              </div>
            </div>
          </div>
        </>
      );
    }

    case AssetManagementActions.EndorseBeneficiary: {
      const { nominee, handleBeneficiaryTransfer, beneficiaryEndorseState } = props;
      const isPendingConfirmation = beneficiaryEndorseState === FormState.PENDING_CONFIRMATION;

      const isValidEndorse = () => {
        if (!nominee) return false;
        // if (nominee === beneficiary) return false;
        if (!isEthereumAddress(nominee)) return false;
        return true;
      };

      return (
        <>
          <div className="flex-1 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 grid-flow-row gap-2 bg-cerulean-50 p-4 rounded-lg">
            <div className="col-span-1">
              <EditableAssetTitle role="Nominee" value={nominee} isEditable={false} />
            </div>
            <div className="col-span-1">
              <EditableAssetTitle role="Holder" value={holder} isEditable={false} />
            </div>
            <div className="col-span-1 xs:col-span-2 sm:col-span-1">
              <EditableAssetTitle
                role="Remark"
                value="Remark"
                newValue={remark}
                onSetNewValue={setRemark}
                isEditable={true}
                isRemark={true}
                isSubmitted={isPendingConfirmation}
              />
            </div>
          </div>
          {beneficiaryEndorseState === FormState.ERROR && (
            <div className="text-scarlet-500 my-2" data-testid="error-msg">
              Unidentified address. Please check and input again.
            </div>
          )}
          <div className="flex-1 flex flex-col flex-wrap xs:flex-row xs:flex-nowrap justify-between pb-4 gap-2">
            <div className="flex-1 content-center" />
            <div className="gap-2 xs:ml-auto xs:min-w-48 xs:w-auto w-full flex flex-col xs:flex-row">
              <div className="w-full xs:min-w-48 xs:max-w-64">
                <Button
                  className="w-full bg-white rounded-xl text-lg py-2 px-3 border-cloud-100 text-cloud-800 shadow-none hover:bg-cloud-200"
                  onClick={setFormActionNone}
                  disabled={isPendingConfirmation}
                  data-testid={"cancelEndorseBtn"}
                >
                  Cancel
                </Button>
              </div>
              <div className="w-full xs:min-w-48 xs:max-w-64">
                <Button
                  className="w-full bg-cerulean-500 rounded-xl text-lg text-white py-2 px-3 shadow-none hover:bg-cerulean-800 flex justify-center items-center"
                  disabled={!isValidEndorse() || isPendingConfirmation}
                  onClick={() =>
                    handleBeneficiaryTransfer({
                      newBeneficiaryAddress: nominee || "",
                      remarks: remark,
                    })
                  }
                  data-testid={"endorseBtn"}
                >
                  {isPendingConfirmation ? <LoaderSpinner data-testid={"loader"} /> : <>Endorse</>}
                </Button>
              </div>
            </div>
          </div>
        </>
      );
    }

    case AssetManagementActions.TransferHolder: {
      const { handleTransfer, holderTransferringState } = props;
      const isPendingConfirmation = holderTransferringState === FormState.PENDING_CONFIRMATION;
      const isEditable =
        holderTransferringState !== FormState.PENDING_CONFIRMATION && holderTransferringState !== FormState.CONFIRMED;

      const isValidTransfer = () => {
        if (!newHolder) return false;
        if (newHolder?.toLowerCase() === holder?.toLowerCase()) return false;
        if (!isEthereumAddress(newHolder)) return false;
        return true;
      };

      return (
        <>
          <div className="flex-1 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 grid-flow-row gap-2 bg-cerulean-50 p-4 rounded-lg">
            <div className="col-span-1">
              <EditableAssetTitle role="Owner" value={beneficiary} isEditable={false} />
            </div>
            <div className="col-span-1">
              <EditableAssetTitle
                role="Holder"
                value={holder}
                newValue={newHolder}
                isEditable={isEditable}
                onSetNewValue={setNewHolder}
                isError={holderTransferringState === FormState.ERROR}
              />
            </div>
            <div className="col-span-1 xs:col-span-2 sm:col-span-1">
              <EditableAssetTitle
                role="Remark"
                value="Remark"
                newValue={remark}
                onSetNewValue={setRemark}
                isEditable={true}
                isRemark={true}
                isSubmitted={isPendingConfirmation}
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col flex-wrap xs:flex-row xs:flex-nowrap justify-between pb-4 gap-2">
            <div className="flex-1 content-center" />
            <div className="gap-2 xs:ml-auto xs:min-w-48 xs:w-auto w-full flex flex-col xs:flex-row">
              <div className="w-full xs:min-w-48 xs:max-w-64">
                <Button
                  className="w-full bg-white rounded-xl text-lg py-2 px-3 border-cloud-100 text-cloud-800 shadow-none hover:bg-cloud-200"
                  onClick={setFormActionNone}
                  disabled={isPendingConfirmation}
                  data-testid={"cancelTransferBtn"}
                >
                  Cancel
                </Button>
              </div>
              <div className="w-full xs:min-w-48 xs:max-w-64">
                <Button
                  className="w-full bg-cerulean-500 rounded-xl text-lg text-white py-2 px-3 shadow-none hover:bg-cerulean-800 flex justify-center items-center"
                  disabled={!isValidTransfer() || isPendingConfirmation}
                  onClick={() =>
                    handleTransfer({
                      holderAddress: newHolder,
                      remarks: remark,
                    })
                  }
                  data-testid={"transferBtn"}
                >
                  {isPendingConfirmation ? <LoaderSpinner data-testid={"loader"} /> : <>Transfer</>}
                </Button>
              </div>
            </div>
          </div>
        </>
      );
    }

    case AssetManagementActions.TransferOwner: {
      const { handleBeneficiaryTransfer, beneficiaryEndorseState } = props;
      const isPendingConfirmation = beneficiaryEndorseState === FormState.PENDING_CONFIRMATION;
      const isEditable =
        beneficiaryEndorseState !== FormState.PENDING_CONFIRMATION && beneficiaryEndorseState !== FormState.CONFIRMED;

      const isValidTransfer = () => {
        if (!newOwner) return false;
        if (newOwner?.toLowerCase() === beneficiary?.toLowerCase()) return false;
        if (!isEthereumAddress(newOwner)) return false;
        return true;
      };

      return (
        <>
          <div className="flex-1 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 grid-flow-row gap-2 bg-cerulean-50 p-4 rounded-lg">
            <div className="col-span-1">
              <EditableAssetTitle
                role="Owner"
                value={beneficiary}
                newValue={newOwner}
                isEditable={isEditable}
                onSetNewValue={setNewOwner}
                isError={beneficiaryEndorseState === FormState.ERROR}
              />
            </div>
            <div className="col-span-1">
              <EditableAssetTitle role="Holder" value={holder} isEditable={false} />
            </div>
            <div className="col-span-1 xs:col-span-2 sm:col-span-1">
              <EditableAssetTitle
                role="Remark"
                value="Remark"
                newValue={remark}
                onSetNewValue={setRemark}
                isEditable={true}
                isRemark={true}
                isSubmitted={isPendingConfirmation}
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col flex-wrap xs:flex-row xs:flex-nowrap justify-between pb-4 gap-2">
            <div className="flex-1 content-center" />
            <div className="gap-2 xs:ml-auto xs:min-w-48 xs:w-auto w-full flex flex-col xs:flex-row">
              <div className="w-full xs:min-w-48 xs:max-w-64">
                <Button
                  className="w-full bg-white rounded-xl text-lg py-2 px-3 border-cloud-100 text-cloud-800 shadow-none hover:bg-cloud-200"
                  onClick={setFormActionNone}
                  disabled={isPendingConfirmation}
                  data-testid={"cancelTransferBtn"}
                >
                  Cancel
                </Button>
              </div>
              <div className="w-full xs:min-w-48 xs:max-w-64">
                <Button
                  className="w-full bg-cerulean-500 rounded-xl text-lg text-white py-2 px-3 shadow-none hover:bg-cerulean-800 flex justify-center items-center"
                  disabled={!isValidTransfer() || isPendingConfirmation}
                  onClick={() =>
                    handleBeneficiaryTransfer({
                      newBeneficiaryAddress: newOwner,
                      remarks: remark,
                    })
                  }
                  data-testid={"transferBtn"}
                >
                  {isPendingConfirmation ? <LoaderSpinner data-testid={"loader"} /> : <>Transfer</>}
                </Button>
              </div>
            </div>
          </div>
        </>
      );
    }

    case AssetManagementActions.TransferOwnerHolder: {
      const { handleEndorseTransfer, transferOwnersState } = props;
      const isPendingConfirmation = transferOwnersState === FormState.PENDING_CONFIRMATION;
      const isEditable =
        transferOwnersState !== FormState.PENDING_CONFIRMATION && transferOwnersState !== FormState.CONFIRMED;

      const isValidEndorseTransfer = (): boolean => {
        if (!newHolder || !newOwner) return false;
        if (newHolder === holder) return false;
        if (!isEthereumAddress(newHolder) || !isEthereumAddress(newOwner)) return false;

        return true;
      };

      return (
        <>
          <div className="flex-1 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 grid-flow-row gap-2 bg-cerulean-50 p-4 rounded-lg">
            <div className="col-span-1">
              <EditableAssetTitle
                role="Owner"
                value={beneficiary}
                newValue={newOwner}
                isEditable={isEditable}
                onSetNewValue={setNewOwner}
                isError={transferOwnersState === FormState.ERROR}
              />
            </div>
            <div className="col-span-1">
              <EditableAssetTitle
                role="Holder"
                value={holder}
                newValue={newHolder}
                isEditable={isEditable}
                onSetNewValue={setNewHolder}
                isError={transferOwnersState === FormState.ERROR}
              />
            </div>
            <div className="col-span-1 xs:col-span-2 sm:col-span-1">
              <EditableAssetTitle
                role="Remark"
                value="Remark"
                newValue={remark}
                onSetNewValue={setRemark}
                isEditable={true}
                isRemark={true}
                isSubmitted={isPendingConfirmation}
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col flex-wrap xs:flex-row xs:flex-nowrap justify-between pb-4 gap-2">
            <div className="flex-1 content-center" />
            <div className="gap-2 xs:ml-auto xs:min-w-48 xs:w-auto w-full flex flex-col xs:flex-row">
              <div className="w-full xs:min-w-48 xs:max-w-64">
                <Button
                  className="w-full bg-white rounded-xl text-lg py-2 px-3 border-cloud-100 text-cloud-800 shadow-none hover:bg-cloud-200"
                  onClick={setFormActionNone}
                  disabled={isPendingConfirmation}
                >
                  Cancel
                </Button>
              </div>
              <div className="w-full xs:min-w-48 xs:max-w-64">
                <Button
                  className="w-full bg-cerulean-500 rounded-xl text-lg text-white py-2 px-3 shadow-none hover:bg-cerulean-800 flex justify-center items-center"
                  disabled={!isValidEndorseTransfer() || isPendingConfirmation}
                  onClick={() => {
                    handleEndorseTransfer({
                      newBeneficiaryAddress: newOwner || "",
                      newHolderAddress: newHolder || "",
                      remarks: remark,
                    });
                  }}
                  data-testid={"endorseTransferBtn"}
                >
                  {isPendingConfirmation ? <LoaderSpinner data-testid={"loader"} /> : <>Transfer</>}
                </Button>
              </div>
            </div>
          </div>
        </>
      );
    }

    default:
      return null;
  }
};
