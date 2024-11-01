import React, { FunctionComponent, useState } from "react";
import { encryptRemark } from "../../../../common/utils/chain-utils";
import { ActionManagementSkeleton, RejectActionTitle } from "../ActionManagementSkeleton";

interface RejectHolderFormProps {
  handleRejectTransferOwnerHolder: (remark: string) => void;
  rejectTransferOwnerHolderState: string;
  keyId?: string;
}

export const RejectTransferOwnerHolderOverlay: FunctionComponent<RejectHolderFormProps> = ({
  handleRejectTransferOwnerHolder,
  rejectTransferOwnerHolderState,
  keyId,
}) => {
  const [remarkValue, setRemarkValue] = useState("");

  function handleAction() {
    const encryptedRemark = (remarkValue && encryptRemark(remarkValue, keyId)) ?? "";
    handleRejectTransferOwnerHolder("0x" + encryptedRemark);
  }

  return (
    <>
      <ActionManagementSkeleton
        actionTitle={RejectActionTitle.OWNERSHIP_AND_HOLDERSHIP}
        actionState={rejectTransferOwnerHolderState}
        handleAction={handleAction}
        remarkValue={remarkValue}
        setRemarkValue={setRemarkValue}
      />
    </>
  );
};
