import React, { useState, useContext } from "react";
import { OverlayContentBaseStyle } from "./../Overlay";
import { TableStyle } from "./../../../AddressResolver/AddressesTable";
import { OverlayContent, OverlayContentProps } from "./index";
import styled from "@emotion/styled";
import { useAddressBook } from "../../../../common/hooks/useAddressBook";
import { SvgIcon, SvgIconSearch } from "../../../UI/SvgIcon";
import { CsvUploadButton } from "../../../AddressBook/CsvUploadButton";
import { isEmpty } from "lodash";
import { makeEtherscanAddressURL } from "../../../../utils";
import { vars } from "../../../../styles";
import { OverlayContext } from "./../../../../common/contexts/OverlayContext";

interface AddressBookProps extends OverlayContentProps {
  onSetNewValue?: (newValue: string) => void;
}

export const AddressBook = styled(({ onSetNewValue, ...props }: AddressBookProps) => {
  const { setOverlayVisible } = useContext(OverlayContext);
  const { addressBook } = useAddressBook();
  const [searchTerm, setSearchTerm] = useState("");

  const onSearchTermChanged = (event: { target: { value: string } }) => {
    const inputText = event.target.value;
    setSearchTerm(inputText);
  };

  return (
    <OverlayContent data-testid="overlay-addressbook" {...props}>
      <div className="overlay-actionsbar">
        <div className="row align-items-center">
          <div className="col">
            <div className="overlay-searchbar">
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
      <div className="table-responsive">
        <table className="table">
          <thead className="table-thead">
            <tr>
              <th>Name</th>
              <td>Address</td>
            </tr>
          </thead>
          <tbody className="table-tbody">
            {isEmpty(addressBook) ? (
              <tr>
                <th>&mdash;</th>
                <td>No Address found.</td>
              </tr>
            ) : (
              Object.keys(addressBook).map((key) => {
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
                    onClick={() => {
                      if (onSetNewValue) {
                        onSetNewValue(address);
                        setOverlayVisible(false);
                      }
                    }}
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
    </OverlayContent>
  );
})`
  ${OverlayContentBaseStyle()}
  ${TableStyle()}

  max-width: 760px;
  max-height: 600px;

  .overlay-searchbar {
    border: solid 1px ${vars.greyLight};
    padding: 5px 10px;
    max-width: 300px;

    input {
      border: none;
      outline: none;
      width: 100%;

      &::placeholder {
        font-style: italic;
        color: ${vars.greyLight};
      }
    }

    svg {
      color: ${vars.grey};
    }
  }

  .overlay-actionsbar {
    margin-bottom: 20px;
  }

  .table-tbody {
    height: 360px;

    tr {
      cursor: ${(props) => (props.onSetNewValue ? "pointer" : "default")};

      &:hover {
        background-color: ${(props) => (props.onSetNewValue ? vars.greyLighter : "inherit")};

        &:nth-of-type(even) {
          background-color: ${(props) => (props.onSetNewValue ? vars.greyLighter : "inherit")};
        }
      }
    }
  }

  .table {
    th {
      width: 120px;
    }
  }
`;
