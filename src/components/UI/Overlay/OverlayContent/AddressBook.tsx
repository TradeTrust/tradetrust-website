import React, { useState, useContext } from "react";
import { OverlayContentBaseStyle } from "./../Overlay";
import { TableStyle } from "./../../../AddressResolver/AddressesTable";
import { OverlayContent, OverlayContentProps } from "./index";
import styled from "@emotion/styled";
import { useAddressBook } from "../../../../common/hooks/useAddressBook";
import { SvgIcon, SvgIconSearch, SvgIconExternalLink } from "../../../UI/SvgIcon";
import { CsvUploadButton } from "../../../AddressBook/CsvUploadButton";
import { isEmpty } from "lodash";
import { makeEtherscanAddressURL } from "../../../../utils";
import { vars } from "../../../../styles";
import { OverlayContext } from "./../../../../common/contexts/OverlayContext";

interface AddressBookProps extends OverlayContentProps {
  onAddressSelected?: (newValue: string) => void;
}

export const AddressBook = styled(({ onAddressSelected, ...props }: AddressBookProps) => {
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
              <td>&nbsp;</td>
            </tr>
          </thead>
          <tbody className="table-tbody">
            {isEmpty(addressBook) ? (
              <tr>
                <th>&mdash;</th>
                <td>No Address found.</td>
                <td>&nbsp;</td>
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
                      if (onAddressSelected) {
                        onAddressSelected(address);
                        setOverlayVisible(false);
                      }
                    }}
                  >
                    <th>{name}</th>
                    <td>{address}</td>
                    <td>
                      <a href={addressHref} target="_blank" rel="noreferrer noopener">
                        <SvgIcon>
                          <SvgIconExternalLink />
                        </SvgIcon>
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
      transition: background-color 0.3s ${vars.easeOutCubic};
      cursor: ${(props) => (props.onAddressSelected ? "pointer" : "default")};

      &:hover {
        background-color: ${(props) => (props.onAddressSelected ? vars.greyLighter : "inherit")};

        &:nth-of-type(even) {
          background-color: ${(props) => (props.onAddressSelected ? vars.greyLighter : "inherit")};
        }
      }

      a {
        svg {
          max-width: 16px;
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
