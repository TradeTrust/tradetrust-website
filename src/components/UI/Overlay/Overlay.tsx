import React, { useState, useEffect } from "react";
import css from "./Overlay.module.scss";
import { SvgIcon, SvgIconX, SvgIconSearch } from "../../UI/SvgIcon";
import { CsvUploadButton } from "../../AddressBook/CsvUploadButton";
import { AddressBook } from "../../../common/hooks/useAddressBook";
import { makeEtherscanAddressURL } from "../../../utils";
import { isEmpty, pickBy } from "lodash";

interface OverlayProps {
  id?: string;
  isOverlayVisible: boolean;
  title: string;
  className?: string;
  children: React.ReactNode;
  onClick(event: React.MouseEvent<HTMLElement>): void;
}

export const Overlay = ({ id, isOverlayVisible, title, className, children, onClick }: OverlayProps) => {
  const modifierClassName = className ? className : "";
  const toggle = isOverlayVisible ? css["is-visible"] : "";

  return (
    <div id={id} className={`${css.overlay} ${modifierClassName} ${toggle}`}>
      <div className={css["overlay-bg"]} onClick={onClick} />
      <div className={css["overlay-content"]}>
        <div className={css["overlay-header"]}>
          <div className="container-fluid">
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
        </div>
        <div className={css["overlay-body"]}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">{children}</div>
            </div>
          </div>
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

interface OverlayAddressBookContentProps {
  addressBook: AddressBook;
}

export const OverlayAddressBookContent = ({ addressBook }: OverlayAddressBookContentProps) => {
  const [searchName, setSearchName] = useState("");
  const [filteredAddressBook, setFilteredAddressBook] = useState(addressBook);

  useEffect(() => {
    if (searchName.length > 0) {
      const filtered = pickBy(addressBook, value => {
        const searchTerm = searchName.toLowerCase();
        const name = value.toLowerCase();
        if (name.includes(searchTerm)) {
          return value;
        }
      });
      setFilteredAddressBook(filtered);
    } else {
      setFilteredAddressBook(addressBook);
    }
  }, [searchName, addressBook]);

  return (
    <>
      <div className={css["overlay-actionsbar"]}>
        <div className="row align-items-center">
          <div className="col">
            <div className={css["overlay-searchbar"]}>
              <div className="row no-gutters align-items-center">
                <div className="col">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchName}
                    onChange={e => {
                      setSearchName(e.target.value);
                    }}
                  />
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
            {isEmpty(filteredAddressBook) ? (
              <tr className="text-center p-2">
                <td className="border-0">No Address found.</td>
              </tr>
            ) : (
              Object.keys(filteredAddressBook).map(key => {
                const addressHref = makeEtherscanAddressURL(key);

                return (
                  <tr key={key}>
                    <th>{filteredAddressBook[key]}</th>
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
    </>
  );
};
