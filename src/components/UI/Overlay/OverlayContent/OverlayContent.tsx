import { IconError, IconSuccess } from "@tradetrust-tt/tradetrust-ui-components";
import React, { FunctionComponent } from "react";
import { X } from "react-feather";
import { useOverlayContext } from "../../../../common/contexts/OverlayContext";

export interface OverlayContentProps {
  className?: string;
  title: string;
  isSuccess?: boolean;
  children?: React.ReactNode;
  crossStyle?: string;
  maxHeight?: number;
}

/**
 * OverlayContent is a component to display overlay contents.
 * @param className className for the overlay content container
 * @param title displays the title for the overlay contents
 * @param isSuccess a boolean, if true will display a green tick on the left of the title, if false will display a red cross on the left of the title, if undefined will not display anything
 * @param children children component for this component
 * @param crossStyle className for the 'X' button to close the overlay
 * @param maxHeight maxHeight for overlay content
 */
export const OverlayContent: FunctionComponent<OverlayContentProps> = ({
  className,
  title,
  isSuccess,
  children,
  crossStyle,
  maxHeight,
  ...props
}) => {
  const { isOverlayVisible, closeOverlay } = useOverlayContext();

  const style = {
    width: "calc(100vw - (15px * 2))",
    ...(maxHeight && { maxHeight: `${maxHeight}px` }),
  };

  return (
    <>
      {isOverlayVisible && (
        <div
          className={`relative flex flex-col p-5 rounded-xl shadow-lg overflow-auto h-auto ${className}`}
          {...props}
          style={style}
        >
          <div className="text-cloud-800">
            <div className="flex flex-nowrap content-center items-start mb-2">
              {isSuccess !== undefined && (
                <div className="w-auto mr-3 mt-0.5">
                  {isSuccess ? <IconSuccess className="text-forest-500" /> : <IconError />}
                </div>
              )}
              <h3 className="mb-0 leading-8" data-testid="overlay-title">
                {title}
              </h3>
              <div className="w-auto ml-auto cursor-pointer" onClick={closeOverlay} data-testid="overlay-close">
                <X className={crossStyle ? crossStyle : ""} />
              </div>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
};
