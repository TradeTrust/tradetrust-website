import { OverlayContext } from "@tradetrust-tt/tradetrust-ui-components";
import React, { FunctionComponent, useContext, useState } from "react";

import { encryptRemark } from "../../../../common/utils/chain-utils";
import { ActionManagementSkeleton } from "../ActionManagementSkeleton";

interface RejectHolderFormProps {
  handleRejectTransferHolder: (remark: string) => void;
  rejectTransferHolderState: string;
  setFormActionNone: () => void;
  setShowEndorsementChain: (payload: boolean) => void;
  keyId?: string;
}

export const RejectTransferHolderOverlay: FunctionComponent<RejectHolderFormProps> = ({
  handleRejectTransferHolder,
  rejectTransferHolderState,
  setFormActionNone,
  setShowEndorsementChain,
  keyId,
}) => {
  const [remarkValue, setRemarkValue] = useState("");
  // const isConfirmed = rejectTransferHolderState === FormState.CONFIRMED;
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
  const handleAction = () => {
    const encryptedRemark = encryptRemark(remarkValue, keyId);
    handleRejectTransferHolder("0x" + encryptedRemark);
  };

  return (
    <>
      <ActionManagementSkeleton
        actionTitle="Holdership"
        actionState={rejectTransferHolderState}
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
