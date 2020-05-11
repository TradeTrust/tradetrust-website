import React, { useContext } from "react";
import { CSSTransition } from "react-transition-group";
import { OverlayContext } from "../../../../common/contexts/OverlayContext";
import { SvgIcon, SvgIconX, SvgIconXCircle, SvgIconCheckCircle } from "../../../UI/SvgIcon";
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
          <div className="row no-gutters align-items-center">
            {isSuccess !== undefined && (
              <div className="col-auto mr-1">
                <div className="title-icon">
                  <SvgIcon>{isSuccess ? <SvgIconCheckCircle /> : <SvgIconXCircle />}</SvgIcon>
                </div>
              </div>
            )}
            <div className="col">
              <h3 className="overlay-title">{title}</h3>
            </div>
            <div className="col-auto ml-auto">
              <div className="overlay-cancel" onClick={handleCloseOverlay}>
                <SvgIcon>
                  <SvgIconX />
                </SvgIcon>
              </div>
            </div>
          </div>
        </div>
        <div className="overlay-body">
          <div className="d-flex flex-column h-100">{children}</div>
        </div>
      </div>
    </CSSTransition>
  );
};
