import { Button, ButtonHeight } from "../Button";
import React, { useEffect, useState, useRef } from "react";
import { NetworkSelect } from "../Layout/NetworkSelect";
import { Modal } from "../UI/Overlay/OverlayContent/Modal";
import { HelpCircle } from "react-feather";
import { useProviderContext } from "../../common/contexts/provider";
import { useOverlayContext } from "../../common/contexts/OverlayContext";
import { HeaderIconState } from "../UI/Overlay/OverlayContent/Modal";

interface NetworkSectionModelProps {
  collapsible?: boolean;
  nextStep?: React.ReactNode | (() => void);
  title?: string;
  headerIconState?: (typeof HeaderIconState)[keyof typeof HeaderIconState];
  cancelText?: string;
  continueText?: string;
  preContent?: React.ReactNode;
  postContent?: React.ReactNode;
}

const NetworkSectionModel: React.FC<NetworkSectionModelProps> = ({
  collapsible = false,
  nextStep,
  title = "Network Selector",
  headerIconState,
  cancelText = "Cancel",
  continueText = "Continue",
  preContent,
  postContent,
}) => {
  const { closeOverlay, showOverlay } = useOverlayContext();
  const { currentChainId, networkChangeLoading, setNetworkChangeLoading } = useProviderContext();

  useEffect(() => {
    setNetworkChangeLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const NetworkSelectorInfoTooltip: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0, width: 0 });
    const iconRef = useRef<HTMLDivElement>(null);

    const updateTooltipPosition = () => {
      if (iconRef.current) {
        const rect = iconRef.current.getBoundingClientRect();
        const screenWidth = window.innerWidth;
        const maxWidth = Math.min(320, screenWidth - 32);

        let left = rect.right - maxWidth;

        if (left < 16) {
          left = 16;
        }

        setTooltipPosition({
          top: rect.bottom + 8,
          left: left,
          width: maxWidth,
        });
      }
    };

    useEffect(() => {
      if (isVisible) {
        updateTooltipPosition();
        window.addEventListener("scroll", updateTooltipPosition);
        window.addEventListener("resize", updateTooltipPosition);

        return () => {
          window.removeEventListener("scroll", updateTooltipPosition);
          window.removeEventListener("resize", updateTooltipPosition);
        };
      }
    }, [isVisible]);

    return (
      <>
        <div
          ref={iconRef}
          className="cursor-pointer focus:outline-none p-1"
          onClick={() => setIsVisible(!isVisible)}
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
            <title>Network Selector Info</title>
            <path
              d="M7.8999 11.3C7.8999 10.6 7.9999 10.2 8.1999 9.9C8.3999 9.6 8.7999 9.2 9.2999 8.8C9.5999 8.5 9.8999 8.2 10.0999 7.9C10.2999 7.6 10.3999 7.2 10.3999 6.9C10.3999 6.5 10.2999 6.1 10.0999 5.9C9.8999 5.7 9.5999 5.5 9.0999 5.5C8.7999 5.5 8.4999 5.6 8.1999 5.8C7.9999 6 7.8999 6.3 7.8999 6.7H5.8999C5.8999 5.8 6.1999 5.1 6.7999 4.7C7.3999 4.2 8.1999 4 9.1999 4C10.1999 4 11.0999 4.3 11.5999 4.8C12.1999 5.3 12.4999 6 12.4999 6.9C12.4999 7.5 12.2999 8 11.9999 8.5C11.6999 9 11.1999 9.4 10.6999 9.8C10.3999 10 10.1999 10.2 10.0999 10.5C9.9999 10.6 9.9999 10.9 9.9999 11.3H7.8999Z"
              fill="#4DA6E8"
            />
            <path
              d="M8.9002 14.3004C9.56294 14.3004 10.1002 13.7631 10.1002 13.1004C10.1002 12.4376 9.56294 11.9004 8.9002 11.9004C8.23745 11.9004 7.7002 12.4376 7.7002 13.1004C7.7002 13.7631 8.23745 14.3004 8.9002 14.3004Z"
              fill="#4DA6E8"
            />
            <path
              d="M9 2C12.9 2 16 5.1 16 9C16 12.9 12.9 16 9 16C5.1 16 2 12.9 2 9C2 5.1 5.1 2 9 2ZM9 0C4 0 0 4 0 9C0 14 4 18 9 18C14 18 18 14 18 9C18 4 14 0 9 0Z"
              fill="#4DA6E8"
            />
          </svg>
        </div>

        {isVisible && (
          <div
            className="fixed z-[1001] pointer-events-none"
            style={{
              top: `${tooltipPosition.top}px`,
              left: `${tooltipPosition.left}px`,
              width: `${tooltipPosition.width}px`,
            }}
          >
            <div className="bg-white p-4 rounded-lg shadow-lg border pointer-events-auto w-full">
              <h3 className="font-medium mb-2">Network Selector</h3>
              <p className="text-sm text-gray-700">
                A document can only be successfully verified on the same network where the document was created in.
              </p>
              <br />
              <p className="text-sm text-gray-700">If unsure, do check with the document issuer.</p>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <Modal
      title={title}
      headerIconState={headerIconState}
      collapsible={collapsible}
      showDivider={false}
      data-testid="network-section-model"
      footer={
        <>
          <Button
            className="flex-1 w-full xs:w-auto text-cerulean-500"
            height={ButtonHeight.LG}
            onClick={closeOverlay}
            data-testid="overlayCancelBtn"
          >
            {cancelText}
          </Button>
          <Button
            disabled={currentChainId === undefined || networkChangeLoading}
            className="flex-1 w-full xs:w-auto bg-cerulean-500 text-white hover:bg-cerulean-800 disabled:cursor-not-allowed disabled:bg-cloud-300"
            height={ButtonHeight.LG}
            onClick={() => {
              closeOverlay();
              if (nextStep) {
                if (nextStep instanceof Function) {
                  nextStep();
                } else {
                  showOverlay(nextStep);
                }
              }
            }}
            data-testid="overlayContinueBtn"
          >
            {continueText}
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        {!!preContent ? (
          preContent
        ) : (
          <div>
            <p>Choose the blockchain network you want to use for your transferable document.</p>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <span>Select Network: </span>
          <div className="flex items-start gap-2">
            <NetworkSelect disabled={false} document={undefined} inPlaceLoading={true} />
            <div className="mt-1">
              <NetworkSelectorInfoTooltip />
            </div>
          </div>
        </div>

        {!!postContent ? (
          postContent
        ) : (
          <div className="flex flex-row gap-2 bg-cerulean-50 p-2 rounded-lg border">
            <div className="flex items-center h-6">
              <HelpCircle color="#4DA6E8" size={18} />
            </div>
            <span className="flex-1">
              A document can only be successfully verified on the same network where the document was created in.
            </span>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default NetworkSectionModel;
