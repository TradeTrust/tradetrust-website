import { Button, ButtonSize } from "../../Button";
import React, { FunctionComponent } from "react";

interface ConfirmModalProps {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  show: boolean;
  onCloseText?: string;
  onConfirmText?: string;
  onConfirm: () => void;
  onClose: () => void;
}

export const ConfirmModal: FunctionComponent<ConfirmModalProps> = ({
  title,
  description,
  onConfirm,
  show,
  onClose,
  onCloseText,
  onConfirmText,
}) => {
  return (
    <>
      {show && (
        <div className="overlay fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center z-50">
          <div className="overlay-bg absolute top-0 left-0 w-full h-full bg-black bg-opacity-40" />
          <div
            className="relative flex flex-col rounded-xl shadow-lg overflow-hidden bg-white max-w-[640px] w-full"
            style={{ width: "calc(100vw - (15px * 2))" }}
            data-testid="abort-form"
          >
            {/* Header */}
            <div className="flex flex-nowrap justify-start items-center p-6 pb-4">
              {/* Icon + Title */}
              <div className="flex items-center space-x-3">
                <img className="h-6 w-6" src="/static/images/alert/warning.png" alt="Warning" />
                <h3 className="flex-1 w-auto leading-7 p-2" data-testid="modal-title">
                  {typeof title === "string" ? <span>{title}</span> : title}
                </h3>
              </div>
            </div>

            <hr className="border-cloud-200" />

            {/* Content */}
            <div
              id="content"
              className="px-6 py-4 flex-1 overflow-y-auto break-words text-left text-cloud-800 text-base space-y-2"
              data-testid="modal-description"
            >
              {description}
            </div>

            <hr className="border-cloud-200" />

            {/* Footer */}
            <div className="flex flex-col flex-wrap xs:flex-nowrap xs:flex-row gap-2 content-center items-start p-6 pt-4">
              <Button
                className="flex-1 bg-white text-cerulean-500 hover:bg-cloud-100 w-full xs:w-auto h-12"
                size={ButtonSize.LG}
                onClick={onClose}
                data-testid="confirm-modal-cancel-button"
              >
                {onCloseText || "Cancel"}
              </Button>
              <Button
                className="flex-1 bg-cerulean-500 text-white hover:bg-cerulean-800 w-full xs:w-auto h-12"
                size={ButtonSize.LG}
                onClick={onConfirm}
                data-testid="confirm-modal-confirm-button"
              >
                {onConfirmText || "Confirm"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
