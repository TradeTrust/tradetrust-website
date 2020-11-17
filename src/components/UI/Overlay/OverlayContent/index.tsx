import React, { useContext } from "react";
import { CSSTransition } from "react-transition-group";
import { OverlayContext } from "../../../../common/contexts/OverlayContext";
import { vars } from "../../../../styles";
import { X, XCircle, CheckCircle } from "react-feather";
import { useLockBodyScroll } from "../../../../common/hooks/useLockBodyScroll";

export interface OverlayContentProps {
  className?: string;
  title: string;
  isSuccess?: boolean;
  children?: React.ReactNode;
}

export const OverlayContent = ({ className, title, isSuccess, children, ...props }: OverlayContentProps) => {
  const { isOverlayVisible, setOverlayVisible } = useContext(OverlayContext);
  const handleCloseOverlay = () => {
    setOverlayVisible(false);
  };

  useLockBodyScroll();

  return (
    <CSSTransition in={isOverlayVisible} timeout={300} classNames="fadescale" appear>
      <div className={`overlay-content ${className}`} {...props}>
        <div className="overlay-header">
          <div className="flex flex-wrap items-center">
            {isSuccess !== undefined && (
              <div className="w-auto mr-1">
                <div className="title-icon">
                  {isSuccess ? <CheckCircle color={`${vars.teal}`} /> : <XCircle color={`${vars.red}`} />}
                </div>
              </div>
            )}
            <div className="flex-grow">
              <h3 className="overlay-title">{title}</h3>
            </div>
            <div className="w-auto ml-auto">
              <div className="overlay-cancel" onClick={handleCloseOverlay}>
                <X />
              </div>
            </div>
          </div>
        </div>
        <div className="overlay-body">
          <div className="flex flex-col h-full">{children}</div>
        </div>
      </div>
    </CSSTransition>
  );
};
