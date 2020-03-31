import React, { useState } from "react";
import css from "./Overlay.module.scss";
import { SvgIcon, SvgIconX, SvgIconSearch } from "../../UI/SvgIcon";
import { CsvUploadButton } from "../../AddressBook/CsvUploadButton";
import { AddressBook } from "../../../common/hooks/useAddressBook";
import { makeEtherscanAddressURL } from "../../../utils";
import { isEmpty } from "lodash";
import { CSSTransition } from "react-transition-group";

interface OverlayProps {
  id?: string;
  title: string;
  className?: string;
  children?: React.ReactNode;
  isOverlayVisible: boolean;
  handleCloseOverlay(event: React.MouseEvent<HTMLElement>): void;
  addressBook?: AddressBook;
}

export const Overlay = ({ id, title, className, children, isOverlayVisible, handleCloseOverlay }: OverlayProps) => {
  const modifierClassName = className ? className : "";

  return (
    <div id={id} className={`${css.overlay} ${modifierClassName}`}>
      <div className={css["overlay-bg"]} onClick={handleCloseOverlay} />
      <CSSTransition in={isOverlayVisible} timeout={300} classNames="fadescale" appear>
        <div className={css["overlay-content"]}>
          <div className={css["overlay-header"]}>
            <div className="container-fluid">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className={css.title}>{title}</h3>
                </div>
                <div className="col-auto ml-auto">
                  <div className={css["overlay-cancel"]} onClick={handleCloseOverlay}>
                    <SvgIcon>
                      <SvgIconX />
                    </SvgIcon>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={css["overlay-body"]}>
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export const OverlayAddressBook = ({ addressBook = {}, ...props }: OverlayProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const onSearchTermChanged = (event: { target: { value: string } }) => {
    const inputText = event.target.value;
    setSearchTerm(inputText);
  };

  return (
    <Overlay className={`${css.addressbook}`} {...props}>
      <div className={css["overlay-actionsbar"]}>
        <div className="row align-items-center">
          <div className="col">
            <div className={css["overlay-searchbar"]}>
              <div className="row no-gutters align-items-center">
                <div className="col">
                  <input type="text" placeholder="Search" value={searchTerm} onChange={onSearchTermChanged} />
                </div>
                <div className="col-auto">
                  <SvgIcon>
                    <SvgIconSearch />
                  </SvgIcon>
                </div>
              </div>
            </div>
          </div>
          <div className="col-auto ml-auto">
            <CsvUploadButton />
          </div>
        </div>
      </div>
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
                const name = addressBook[key];
                const address = key;
                const addressHref = makeEtherscanAddressURL(key);

                const searchTermLowerCase = searchTerm.toLowerCase();
                const nameLowerCase = name.toLowerCase();
                const addressLowerCase = address.toLowerCase();

                return (
                  <tr
                    key={key}
                    className={
                      nameLowerCase.includes(searchTermLowerCase) || addressLowerCase.includes(searchTermLowerCase)
                        ? ""
                        : "d-none"
                    }
                  >
                    <th>{name}</th>
                    <td>
                      <a href={addressHref} target="_blank" rel="noreferrer noopener">
                        {address}
                      </a>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </Overlay>
  );
};
