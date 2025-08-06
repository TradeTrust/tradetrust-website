import React, { FunctionComponent, useState } from "react";
import { ActionManagementSkeleton, RejectActionTitle } from "../ActionManagementSkeleton";

interface RejectHolderFormProps {
  handleRejectTransferOwnerHolder: ({ remarks }: { remarks: string }) => void;
  rejectTransferOwnerHolderState: string;
}

export const RejectTransferOwnerHolderOverlay: FunctionComponent<RejectHolderFormProps> = ({
  handleRejectTransferOwnerHolder,
  rejectTransferOwnerHolderState,
}) => {
  const [remarkValue, setRemarkValue] = useState("");

  function handleAction() {
    handleRejectTransferOwnerHolder({ remarks: remarkValue });
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
