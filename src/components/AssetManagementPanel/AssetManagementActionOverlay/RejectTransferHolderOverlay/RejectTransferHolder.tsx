import React, { FunctionComponent, useState } from "react";

import { ActionManagementSkeleton, RejectActionTitle } from "../ActionManagementSkeleton";

interface RejectHolderFormProps {
  handleRejectTransferHolder: ({ remarks }: { remarks: string }) => void;
  rejectTransferHolderState: string;
}

export const RejectTransferHolderOverlay: FunctionComponent<RejectHolderFormProps> = ({
  handleRejectTransferHolder,
  rejectTransferHolderState,
}) => {
  const [remarkValue, setRemarkValue] = useState("");

  const handleAction = () => {
    handleRejectTransferHolder({ remarks: remarkValue });
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
