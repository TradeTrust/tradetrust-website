import React, { ReactElement } from "react";

interface FooterModalProps {
  toggleConfirmationModal: (i: boolean) => void;
  onSubmit: (val?: boolean) => void;
}

export const FooterModal = ({ toggleConfirmationModal, onSubmit }: FooterModalProps): ReactElement => (
  <>
    <button type="button" className="btn btn-default" onClick={() => toggleConfirmationModal(false)}>
      Close
    </button>
    <button type="submit" id="modal-button-submit" className="btn btn-primary" onClick={() => onSubmit()}>
      Ok
    </button>
  </>
);
