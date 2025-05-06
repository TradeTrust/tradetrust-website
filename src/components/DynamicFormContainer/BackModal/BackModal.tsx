import React, { FunctionComponent } from "react";
import { ConfirmModal } from "../ConfirmModal";

interface BackModalProps {
  backToFormSelection: () => void;
  show: boolean;
  closeBackModal: () => void;
}

export const BackModal: FunctionComponent<BackModalProps> = ({ backToFormSelection, show, closeBackModal }) => {
  return (
    <ConfirmModal
      show={show}
      onClose={closeBackModal}
      onConfirm={backToFormSelection}
      title="Abort Document Creation"
      description={
        <>
          <p>Are you sure you want to abort document creation?</p>
          <p>All progress made will be lost.</p>
        </>
      }
    />
  );
};
