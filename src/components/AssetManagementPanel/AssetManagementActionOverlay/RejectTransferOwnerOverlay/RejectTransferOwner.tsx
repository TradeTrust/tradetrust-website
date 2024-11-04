import React, { FunctionComponent, useState } from "react";
import { encryptRemark } from "../../../../common/utils/chain-utils";
import { ActionManagementSkeleton, RejectActionTitle } from "../ActionManagementSkeleton";

interface RejectOwnerFormProps {
  handleRejectTransferOwner: (remark: string) => void;
  rejectTransferOwnerState: string;
  keyId?: string;
}

export const RejectTransferOwnerOverlay: FunctionComponent<RejectOwnerFormProps> = ({
  handleRejectTransferOwner,
  rejectTransferOwnerState,
  keyId,
}) => {
  const [remarkValue, setRemarkValue] = useState("");

  function handleAction() {
    const encryptedRemark = (remarkValue && encryptRemark(remarkValue, keyId)) ?? "";
    handleRejectTransferOwner("0x" + encryptedRemark);
  }

  return (
    <>
      <ActionManagementSkeleton
        actionTitle={RejectActionTitle.OWNERSHIP}
        actionState={rejectTransferOwnerState}
        handleAction={handleAction}
        remarkValue={remarkValue}
        setRemarkValue={setRemarkValue}
      />
    </>
  );
};
