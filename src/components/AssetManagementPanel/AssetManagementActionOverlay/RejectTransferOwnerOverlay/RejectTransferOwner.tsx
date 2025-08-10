import React, { FunctionComponent, useState } from "react";
import { ActionManagementSkeleton, RejectActionTitle } from "../ActionManagementSkeleton";

interface RejectOwnerFormProps {
  handleRejectTransferOwner: ({ remarks }: { remarks: string }) => void;
  rejectTransferOwnerState: string;
}

export const RejectTransferOwnerOverlay: FunctionComponent<RejectOwnerFormProps> = ({
  handleRejectTransferOwner,
  rejectTransferOwnerState,
}) => {
  const [remarkValue, setRemarkValue] = useState("");

  function handleAction() {
    handleRejectTransferOwner({ remarks: remarkValue });
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
