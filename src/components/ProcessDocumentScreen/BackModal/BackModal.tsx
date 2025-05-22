import React, { FunctionComponent } from "react";
import { ConfirmModal } from "../ConfirmModal";

interface BackModalProps {
  backToFormSelection: () => void;
  show: boolean;
  downloadModal: () => void;
}

export const BackModal: FunctionComponent<BackModalProps> = ({ backToFormSelection, show, downloadModal }) => {
  return (
    <ConfirmModal
      show={show}
      onDownload={downloadModal}
      onConfirm={backToFormSelection}
      title="Document Download"
      description={
        <>
          <p>
            It seems like you are leaving this page without downloading the issued documents yet. Download all
            documents?
          </p>
        </>
      }
    />
  );
};
