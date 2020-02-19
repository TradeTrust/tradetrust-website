import React, { ReactElement, useState, useEffect } from "react";

interface PopupModalProps {
  children: ReactElement;
  title: string;
  showLoader?: boolean;
  containerStyle?: {
    [key: string]: string | number;
  };
  toggleDisplay: (val: boolean) => void;
  footerComponent?: ReactElement;
}

export const PopupModal = ({
  children,
  toggleDisplay,
  title,
  showLoader,
  containerStyle,
  footerComponent
}: PopupModalProps): ReactElement => {
  const [isFadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: any): void => {
      event = event || window.event;

      switch (event.keyCode) {
        case 27: // escape key
          if (!showLoader) {
            toggleDisplay(false);
          }
        case 13: // enter
          document.getElementById("modal-button-submit")?.click(); //eslint-disable-line mdx/no-unused-expressions
        default:
      }
    };

    setTimeout(() => {
      setFadeIn(true);
    }, 0);

    document.addEventListener("keydown", onKeyDown);
    return function cleanup() {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [showLoader, toggleDisplay]);

  return (
    <>
      <div className="modal-open">
        <div
          id="preview-modal"
          className={`modal fade ${isFadeIn && "show"}`}
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-dialog-centered" style={containerStyle}>
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">{title}</h4>
                {!showLoader && (
                  <button type="button" className="close" onClick={() => toggleDisplay(false)}>
                    &times;
                  </button>
                )}
              </div>
              <div className="modal-body">{children}</div>
              <div className="modal-footer">
                {!showLoader &&
                  (footerComponent ? (
                    footerComponent
                  ) : (
                    <button type="button" className="btn btn-default" onClick={() => toggleDisplay(false)}>
                      Close
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className={`modal-backdrop fade ${isFadeIn && "show"}`} />
      </div>
    </>
  );
};
