import React, { useState, useContext, useEffect } from "react";
import { OverlayContentBaseStyle } from "./../Overlay";
import { TableStyle } from "./../../../AddressResolver/AddressesTable";
import { OverlayContent, OverlayContentProps } from "./index";
import styled from "@emotion/styled";
import { useAddressBook } from "../../../../common/hooks/useAddressBook";
import { Search, Download } from "react-feather";
import { CsvUploadButton } from "../../../AddressBook/CsvUploadButton";
import { AnchorLinkButtonSolidWhiteBlue } from "../../../UI/Button";
import { vars } from "../../../../styles";
import { OverlayContext } from "./../../../../common/contexts/OverlayContext";
import { Dropdown } from "react-bootstrap";
import { useThirdPartyAPIEndpoints } from "../../../../common/hooks/useThirdPartyAPIEndpoints";
import axios from "axios";
import { AddressBookTable } from "./AddressBookTable";

export interface AddressBookThirdPartyProps {
  identifier: string;
  name: string;
  remarks: string;
}

export interface AddressBookDropdownProps {
  name: string;
  endpoint?: string;
  apiHeader?: string;
  apiKey?: string;
  path?: {
    addressResolution?: string;
    entityLookup?: string;
  };
}

interface AddressBookProps extends OverlayContentProps {
  onAddressSelected?: (newValue: string) => void;
}

export const AddressBook = styled(({ onAddressSelected, ...props }: AddressBookProps) => {
  const { setOverlayVisible } = useContext(OverlayContext);
  const { thirdPartyAPIEndpoints } = useThirdPartyAPIEndpoints();

  const [searchTerm, setSearchTerm] = useState("");
  const [addressBookDropdown, setAddressBookDropdown] = useState<AddressBookDropdownProps>({ name: "Local" });

  const { addressBook } = useAddressBook(); // this will be addressBookLocal
  const [addressBookThirdParty, setAddressBookThirdParty] = useState<AddressBookThirdPartyProps[]>([]);

  const onAddressSelect = (address: string) => {
    if (onAddressSelected) {
      onAddressSelected(address);
      setOverlayVisible(false);
    }
  };

  const onSearchTermChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = event.target.value;
    setSearchTerm(inputText);
  };

  const onAddressBookNameDropdown = (item: AddressBookDropdownProps) => {
    setAddressBookDropdown(item);
    setSearchTerm("");
    setAddressBookThirdParty([]);
  };

  useEffect(() => {
    if (addressBookDropdown.name !== "Local" && searchTerm.length > 2) {
      axios
        .get(`${addressBookDropdown.endpoint}search?q=${searchTerm}`, {
          headers: {
            "x-api-key": addressBookDropdown.apiKey,
          },
        })
        .then((response) => {
          setAddressBookThirdParty(response.data.identities);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setAddressBookThirdParty([]);
    }
  }, [addressBookDropdown, searchTerm]);

  return (
    <OverlayContent data-testid="overlay-addressbook" {...props}>
      <div className="overlay-actionsbar">
        <Dropdown>
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            {addressBookDropdown.name}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => {
                onAddressBookNameDropdown({ name: "Local" });
              }}
            >
              Local
            </Dropdown.Item>
            {thirdPartyAPIEndpoints.map((item, index) => {
              return (
                <Dropdown.Item
                  key={index}
                  onClick={() => {
                    onAddressBookNameDropdown(item);
                  }}
                >
                  {item.name}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
        <div className="row align-items-center">
          <div className="col-12 col-md mb-2 mb-md-0">
            <div className="overlay-searchbar">
              <div className="row no-gutters align-items-center">
                <div className="col">
                  <input type="text" placeholder="Search" value={searchTerm} onChange={onSearchTermChanged} />
                </div>
                <div className="col-auto">
                  <Search />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-auto ml-md-auto">
            <div className="row no-gutters">
              <div className="col-12 col-md-auto mb-2 mb-md-0">
                <AnchorLinkButtonSolidWhiteBlue
                  href="data:text/csv;base64,QWRkcmVzcyxJZGVudGlmaWVyCjB4YTYxQjA1NmRBMDA4NGE1ZjM5MUVDMTM3NTgzMDczMDk2ODgwQzJlMyxEQlMKMHgyOEY3YUIzMkM1MjFEMTNGMkU2OTgwZDA3MkNhN0NBNDkzMDIwMTQ1LFN0YW5kYXJkIENoYXJ0ZXJlZA"
                  download="template.csv"
                >
                  <div className="row align-items-center no-gutters">
                    <div className="col-auto mr-2">
                      <Download />
                    </div>
                    <div className="col-auto">Download template</div>
                  </div>
                </AnchorLinkButtonSolidWhiteBlue>
              </div>
              <div className="col-12 col-md-auto">
                <CsvUploadButton />
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddressBookTable
        addressBookDropdown={addressBookDropdown}
        addressBookLocal={addressBook}
        addressBookThirdParty={addressBookThirdParty}
        searchTerm={searchTerm}
        onAddressSelect={onAddressSelect}
      />
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
    max-width: 100%;

    @media only screen and (min-width: ${vars.md}) {
      max-width: 300px;
    }

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
