import React, { FunctionComponent } from "react";
import { AlertCircle, X } from "react-feather";
import { useOverlayContext } from "../../../../common/contexts/OverlayContext";
import { IconError, IconSuccess } from "../../Icon";
import { LoaderSpinner } from "../../Loader";

export interface ModalProps {
  className?: string;
  title: string;
  headerIcon?: React.ReactNode;
  headerIconState?: (typeof HeaderIconState)[keyof typeof HeaderIconState];
  children?: React.ReactNode;
  crossStyle?: string;
  maxHeight?: number;
  collapsible?: boolean;
  footer?: React.ReactNode;
  footerClassName?: string;
  showDivider?: boolean;
}

export const HeaderIconState = {
  LOADING: <LoaderSpinner width={"32px"} primary="#2D5FAA" secondary="#2D5FAA50" />,
  SUCCESS: <IconSuccess className="text-forest-500 w-8 h-8" />,
  ERROR: <IconError className="text-scarlet-500 w-8 h-8" />,
  WARNING: <AlertCircle className="text-tangerine-500 w-8 h-8" />,
} as const;

export const Modal: FunctionComponent<ModalProps> = ({
  className = "",
  title,
  headerIcon,
  headerIconState,
  children,
  crossStyle,
  maxHeight,
  collapsible,
  footer,
  footerClassName,
  showDivider = true,
  ...props
}) => {
  const { isOverlayVisible, closeOverlay } = useOverlayContext({ collapsible });

  const style = {
    width: "calc(100vw - (15px * 2))",
    ...(maxHeight && { maxHeight: `${maxHeight}px` }),
  };

  return (
    <>
      {isOverlayVisible && (
        <div
          className={`relative flex flex-col rounded-xl shadow-lg overflow-hidden bg-white max-w-[640px] w-full ${className}`}
          {...props}
          style={style}
        >
          <div id="header" className="flex flex-nowrap gap-4 justify-start items-center p-6 pb-4">
            {headerIconState !== undefined ? (
              <div className="flex w-8 items-center justify-center">{headerIconState}</div>
            ) : (
              headerIcon ?? <></>
            )}
            <h3 className="flex-1 w-auto leading-7" data-testid="modal-title">
              {title}
            </h3>
            {collapsible && (
              <div className="w-8 cursor-pointer" onClick={closeOverlay} data-testid="modal-close">
                <X className={crossStyle ? crossStyle : ""} />
              </div>
            )}
          </div>

          {showDivider && <hr className="border-cloud-200" />}

          <div id="content" className="px-6 py-4 flex-1 overflow-y-auto break-words">
            {children}
          </div>

          {footer && (
            <>
              {showDivider && <hr className="border-cloud-200" />}

              <div
                id="footer"
                className={`flex flex-col flex-wrap xs:flex-nowrap xs:flex-row gap-2 content-center items-start p-6 pt-4 ${footerClassName}`}
              >
                {footer}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
