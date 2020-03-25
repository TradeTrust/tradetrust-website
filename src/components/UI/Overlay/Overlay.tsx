import React from "react";
import css from "./Overlay.module.scss";
import { SvgIcon, SvgIconX, SvgIconFilePlus } from "../../UI/SvgIcon";
import { ButtonIconText } from "../../UI/Button";
import { AddressBook } from "../../../common/hooks/useAddressBook";
import { makeEtherscanAddressURL } from "../../../utils";
import { isEmpty } from "lodash";

interface OverlayProps {
  isOverlayVisible: boolean;
  title: string;
  className?: string;
  children: React.ReactNode;
  onClick(event: React.MouseEvent<HTMLElement>): void;
}

export const Overlay = ({ isOverlayVisible, title, className, children, onClick }: OverlayProps) => {
  const modifierClassName = className ? className : "";
  const toggle = isOverlayVisible ? css["is-visible"] : "";

  return (
    <div className={`${css.overlay} ${modifierClassName} ${toggle}`}>
      <div className={css["overlay-bg"]} onClick={onClick} />
      <div className={css["overlay-content"]}>
        <div className={css["overlay-header"]}>
          <div className="row align-items-center">
            <div className="col">
              <h3 className={css.title}>{title}</h3>
            </div>
            <div className="col-auto ml-auto">
              <div className={css["overlay-cancel"]} onClick={onClick}>
                <SvgIcon>
                  <SvgIconX />
                </SvgIcon>
              </div>
            </div>
          </div>
        </div>
        <div className={css["overlay-body"]}>
          <div className="row">
            <div className="col-12">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface OverlayAddressBookTableProps {
  addressBook: AddressBook;
}

export const OverlayAddressBookTable = ({ addressBook }: OverlayAddressBookTableProps) => {
  return (
    <div className={`table-responsive ${css["overlay-table-responsive"]}`}>
      <table className={`table ${css["overlay-table"]}`}>
        <thead className={`${css["overlay-table-thead"]}`}>
          <tr>
            <th>Name</th>
            <td>ID</td>
          </tr>
        </thead>
        <tbody className={`${css["overlay-table-tbody"]}`}>
          {isEmpty(addressBook) ? (
            <tr className="text-center p-2">
              <td className="border-0">No Address found.</td>
            </tr>
          ) : (
            Object.keys(addressBook).map(key => {
              const addressHref = makeEtherscanAddressURL(key);

              return (
                <tr key={key}>
                  <th>{addressBook[key]}</th>
                  <td>
                    <a href={addressHref} target="_blank" rel="noreferrer noopener">
                      {key}
                    </a>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export const OverlayAddressBookActionsBar = () => {
  return (
    <div className={css["overlay-actionsbar"]}>
      <div className="row align-items-center">
        <div className="col-auto ml-auto">
          <ButtonIconText text="Import .csv" color="secondary" bg="white">
            <SvgIcon>
              <SvgIconFilePlus />
            </SvgIcon>
          </ButtonIconText>
        </div>
      </div>
    </div>
  );
};

export const OverlayAddressBook = ({ children, ...props }: OverlayProps) => {
  return (
    <Overlay className={`${css.addressbook}`} {...props}>
      {children}
    </Overlay>
  );
};
