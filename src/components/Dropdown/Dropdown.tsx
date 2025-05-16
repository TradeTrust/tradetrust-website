import React, { FunctionComponent, ReactNode, useState, useRef, useEffect } from "react";
import { ChevronDown } from "react-feather";
import { createPortal } from "react-dom";

export interface DropdownProps {
  dropdownButtonText: string | ReactNode;
  children: React.ReactNode;
  classNameRoot?: string;
  className?: string;
  classNameMenu?: string;
  classNameShared?: string;
  disabled?: boolean;
  menuPortalTarget?: HTMLElement;
}

export const Dropdown: FunctionComponent<DropdownProps> = ({
  dropdownButtonText,
  children,
  classNameRoot,
  className,
  classNameMenu,
  classNameShared,
  disabled,
  menuPortalTarget,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const addonStylesShared = classNameShared ? ` ${classNameShared}` : "";
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen && buttonRef.current && menuPortalTarget) {
      const rect = buttonRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

      setMenuPosition({
        top: rect.bottom + scrollTop,
        left: rect.left + scrollLeft,
      });
    }
  }, [isOpen, menuPortalTarget]);

  const renderDropdownContent = () => {
    const content = (
      <div
        onClick={() => setIsOpen(false)}
        style={
          menuPortalTarget
            ? {
                position: "absolute",
                zIndex: 9999,
                top: menuPosition.top,
                left: menuPosition.left,
                maxWidth: buttonRef.current?.offsetWidth,
              }
            : undefined
        }
        className={`rounded bg-white border border-gray-300 py-2 shadow-lg${addonStylesShared}${
          classNameMenu ? ` ${classNameMenu}` : ""
        }`}
      >
        {children}
      </div>
    );

    if (menuPortalTarget && typeof document !== "undefined") {
      return createPortal(content, menuPortalTarget);
    }

    return content;
  };

  return (
    <div className={`relative${classNameRoot ? ` ${classNameRoot}` : ""}`}>
      <button
        ref={buttonRef}
        {...props}
        disabled={disabled}
        onClick={(event) => {
          event.preventDefault();
          if (!disabled) {
            setIsOpen(!isOpen);
          }
        }}
        className={`relative z-10 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-200 focus:outline-none flex items-center justify-between${addonStylesShared}${
          className ? ` ${className}` : ""
        }`}
      >
        <>
          <span className="flex-1 truncate">{dropdownButtonText}</span>
          <span>
            <ChevronDown />
          </span>
        </>
      </button>
      {isOpen && (
        <>
          {/* <button
            tabIndex={-1}
            onClick={() => setIsOpen(false)}
            className="fixed z-20 inset-0 w-full h-full cursor-default focus:outline-none"
          /> */}
          {renderDropdownContent()}
        </>
      )}
    </div>
  );
};

interface DropdownItemProps {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const DropdownItem: FunctionComponent<DropdownItemProps> = ({ className, children, ...props }) => {
  return (
    <div
      className={`truncate cursor-pointer text-cloud-800 p-3 hover:bg-gray-50 active:bg-gray-300 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
