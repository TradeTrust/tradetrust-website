import React, { useState } from "react";
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
  children?: React.ReactNode;
  handleCloseOverlay(event: React.MouseEvent<HTMLElement>): void;
  addressBook?: AddressBook;
}

export const Overlay = ({ id, isOverlayVisible, title, className, children, handleCloseOverlay }: OverlayProps) => {
  const modifierClassName = className ? className : "";
  const toggle = isOverlayVisible ? css["is-visible"] : "";

  return (
    <div id={id} className={`${css.overlay} ${modifierClassName} ${toggle}`}>
      <div className={css["overlay-bg"]} onClick={handleCloseOverlay} />
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
    </div>
  );
};

export const OverlayAddressBook = ({ addressBook = {}, ...props }: OverlayProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAddressBook, setFilteredAddressBook] = useState(addressBook);

  const updateFilteredAddressBook = (text: string) => {
    if (text.length > 0) {
      const filtered = pickBy(addressBook, (name, address) => {
        const textLowerCase = text.toLowerCase();
        const nameLowerCase = name.toLowerCase();
        const addressLowerCase = address.toLowerCase();
        if (nameLowerCase.includes(textLowerCase) || addressLowerCase.includes(textLowerCase)) {
          return name;
        }
      });
      setFilteredAddressBook(filtered);
    } else {
      setFilteredAddressBook(addressBook);
    }
  };

  const onSearchTermChanged = (event: { target: { value: string } }) => {
    const inputText = event.target.value;
    setSearchTerm(inputText);
    updateFilteredAddressBook(inputText);
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
    </Overlay>
  );
};
