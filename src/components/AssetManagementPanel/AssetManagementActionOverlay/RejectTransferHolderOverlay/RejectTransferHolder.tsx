import React, { FunctionComponent, useState } from "react";

import { encryptRemark } from "../../../../common/utils/chain-utils";
import { ActionManagementSkeleton, RejectActionTitle } from "../ActionManagementSkeleton";

interface RejectHolderFormProps {
  handleRejectTransferHolder: (remark: string) => void;
  rejectTransferHolderState: string;
  keyId?: string;
}

export const RejectTransferHolderOverlay: FunctionComponent<RejectHolderFormProps> = ({
  handleRejectTransferHolder,
  rejectTransferHolderState,
  keyId,
}) => {
  const [remarkValue, setRemarkValue] = useState("");

  const handleAction = () => {
    const encryptedRemark = (remarkValue && encryptRemark(remarkValue, keyId)) ?? "";
    handleRejectTransferHolder("0x" + encryptedRemark);
  };

  return (
    <>
      <ActionManagementSkeleton
        actionTitle={RejectActionTitle.HOLDERSHIP}
        actionState={rejectTransferHolderState}
        handleAction={handleAction}
        remarkValue={remarkValue}
        setRemarkValue={setRemarkValue}
      />
    </>
  );
};
