import { OverlayContext } from "@tradetrust-tt/tradetrust-ui-components";
import React, { FunctionComponent, useContext, useState } from "react";
import { encryptRemark } from "../../../../common/utils/chain-utils";
import { ActionManagementSkeleton } from "../ActionManagementSkeleton";

interface RejectHolderFormProps {
  handleRejectTransferOwnerHolder: (remark: string) => void;
  rejectTransferOwnerHolderState: string;
  setFormActionNone: () => void;
  setShowEndorsementChain: (payload: boolean) => void;
  keyId?: string;
}

export const RejectTransferOwnerHolderOverlay: FunctionComponent<RejectHolderFormProps> = ({
  handleRejectTransferOwnerHolder,
  rejectTransferOwnerHolderState,
  setFormActionNone,
  setShowEndorsementChain,
  keyId,
}) => {
  const [remarkValue, setRemarkValue] = useState("");
  // const isConfirmed = rejectTransferOwnerHolderState === FormState.CONFIRMED;
  const { closeOverlay } = useContext(OverlayContext);
  // useEffect(() => {
  //   if (isConfirmed) {
  //     showOverlay(
  //       showDocumentTransferMessage(MessageTitle.REJECT_TRANSFER_HOLDER_SUCCESS, {
  //         isSuccess: true,
  //       })
  //     );
  //     setFormActionNone();
  //   }
  // }, [isConfirmed, showOverlay, setFormActionNone]);
  function handleAction() {
    const encryptedRemark = encryptRemark(remarkValue, keyId);
    console.log("here", remarkValue);
    handleRejectTransferOwnerHolder("0x" + encryptedRemark);
  }

  return (
    <>
      <ActionManagementSkeleton
        actionTitle="Ownership & Holdership"
        actionState={rejectTransferOwnerHolderState}
        handleAction={handleAction}
        setFormActionNone={setFormActionNone}
        setShowEndorsementChain={setShowEndorsementChain}
        closeOverlay={closeOverlay}
        remarkValue={remarkValue}
        setRemarkValue={setRemarkValue}
      />
    </>
  );
};
