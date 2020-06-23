import React from "react";
import styled from "@emotion/styled";

interface ModalDialogProps {
  className?: string;
  show: boolean;
  toggle: () => void;
  children?: React.ReactNode;
}

export const ModalDialogUnStyled = ({ className, show, toggle, children }: ModalDialogProps) => {
  return (
    <>
      {show && (
        <div className={className}>
          <div className={`modal-content p-3`}>
            <div className={`modal-cross pointer`} onClick={() => toggle()}>
              <i className="fa fa-times text-muted" />
            </div>
            {children}
          </div>
          <div
            style={{ position: "fixed", zIndex: 10 }}
            className="modal-backdrop fade show"
            onClick={() => toggle()}
          />
        </div>
      )}
    </>
  );
};

export const ModalDialog = styled(ModalDialogUnStyled)`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;

  .modal-content {
    position: relative;
    z-index: 15;
    max-width: 500px;
    border-radius: 5px;
  }

  .modal-cross {
    text-align: right;
  }
`;
