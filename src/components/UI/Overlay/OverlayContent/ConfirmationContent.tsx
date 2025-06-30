import React, { FunctionComponent } from "react";
import { useOverlayContext } from "../../../../common/contexts/OverlayContext";
import { Button } from "../../../Button";
import { IconSuccess, IconWarning } from "../../Icon";

export const enum MESSAGE_TYPE {
  SUCCESS = "success",
  WARNING = "warning",
  NONE = "none",
}

export interface ConfirmationContentProps {
  messageType: MESSAGE_TYPE;
  title?: string;
  children?: React.ReactNode;
  btnText?: string;
  maxHeight?: number;
  className?: string;
}

export const DismissalButton: FunctionComponent<{ buttonText?: string }> = ({
  buttonText = "Dismiss",
}: {
  buttonText?: string;
}) => {
  const { closeOverlay } = useOverlayContext();
  return (
    <Button
      className="bg-cerulean-500 hover:bg-cerulean-800 rounded-xl px-3 py-2 mx-auto mt-3 text-white font-normal"
      onClick={closeOverlay}
    >
      {buttonText}
    </Button>
  );
};

export const ConfirmationContent: FunctionComponent<ConfirmationContentProps> = ({
  messageType,
  title: messageTitle,
  children,
  maxHeight,
  className,
  ...props
}: ConfirmationContentProps) => {
  const style = {
    ...(maxHeight && { maxHeight: `${maxHeight}px` }),
  };

  let messageIcon;
  switch (messageType) {
    case MESSAGE_TYPE.SUCCESS:
      messageIcon = <IconSuccess className="text-forest-500 h-14 w-14" />;
      break;
    case MESSAGE_TYPE.WARNING:
      messageIcon = <IconWarning className="h-14 w-14" />;
      break;
    default:
      messageIcon = null;
      break;
  }
  return (
    <div
      className={`relative bg-white rounded-xl text-center p-5 overflow-auto w-80 h-70 ${className}`}
      {...props}
      style={style}
    >
      <div className="flex flex-col">
        {messageIcon && <div className="self-center mt-5">{messageIcon}</div>}
        <h3 className="text-cloud-800 text-xl mt-5 mb-5">{messageTitle}</h3>
        {children}
      </div>
    </div>
  );
};
