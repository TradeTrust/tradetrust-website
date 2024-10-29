import { OverlayContext } from "@tradetrust-tt/tradetrust-ui-components";
import React, { FunctionComponent, useContext, useState } from "react";

import { encryptRemark } from "../../../../common/utils/chain-utils";
import { ActionManagementSkeleton } from "../ActionManagementSkeleton";

interface RejectOwnerFormProps {
  handleRejectTransferOwner: (remark: string) => void;
  rejectTransferOwnerState: string;
  setFormActionNone: () => void;
  setShowEndorsementChain: (payload: boolean) => void;
  keyId?: string;
}

export const RejectTransferOwnerOverlay: FunctionComponent<RejectOwnerFormProps> = ({
  handleRejectTransferOwner,
  rejectTransferOwnerState,
  setFormActionNone,
  setShowEndorsementChain,
  keyId,
}) => {
  const [remarkValue, setRemarkValue] = useState("");

  //   const isConfirmed = rejectTransferOwnerState === FormState.CONFIRMED;

  const { closeOverlay } = useContext(OverlayContext);
  //   useEffect(() => {
  //     if (isConfirmed) {
  //       showOverlay(
  //         showDocumentTransferMessage(MessageTitle.REJECT_TRANSFER_OWNER_SUCCESS, {
  //           isSuccess: true,
  //         })
  //       );
  //       setFormActionNone();
  //     }
  //   }, [isConfirmed, showOverlay, setFormActionNone]);

  function handleAction() {
    const encryptedRemark = encryptRemark(remarkValue, keyId);
    handleRejectTransferOwner("0x" + encryptedRemark);
  }

  return (
    <>
      <ActionManagementSkeleton
        actionTitle="Ownership"
        actionState={rejectTransferOwnerState}
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
