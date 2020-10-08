import React, { useState, useContext } from "react";
import { OverlayContentBaseStyle } from "./../Overlay";
import { TableStyle } from "./../../../AddressResolver/AddressesTable";
import { OverlayContent, OverlayContentProps } from "./index";
import styled from "@emotion/styled";
import { Search, Download } from "react-feather";
import { CsvUploadButton } from "../../../AddressBook/CsvUploadButton";
import { AnchorLinkButtonSolidWhiteBlue } from "../../../UI/Button";
import { vars } from "../../../../styles";
import { OverlayContext } from "./../../../../common/contexts/OverlayContext";
import { Dropdown } from "react-bootstrap";
import { useThirdPartyAPIEndpoints } from "../../../../common/hooks/useThirdPartyAPIEndpoints";
import axios from "axios";
import { HeadersProps } from "./../../../../services/addressResolver";
import { debounce } from "lodash";
import { AddressBookLocal } from "./AddressBookLocal";
import { AddressBookThirdParty } from "./AddressBookThirdParty";

export interface AddressBookThirdPartyResultsProps {
  identifier: string;
  name: string;
  remarks: string;
}

export interface AddressBookDropdownProps {
  name: string;
  endpoint: string;
  apiHeader: string;
  apiKey: string;
}

interface AddressBookProps extends OverlayContentProps {
  onAddressSelected?: (newValue: string) => void;
}

const StyledDropdownButton = styled(Dropdown.Toggle)`
  position: relative;
  border-radius: 0;
  max-width: 360px;
  width: 100%;
  text-align: left;
  border: solid 1px ${vars.greyLight};

  &:focus {
    box-shadow: none;
  }

  &:hover {
    background-color: ${vars.greyLightest};
  }

  &::after {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const StyledDropdownItem = styled(Dropdown.Item)`
  &:active {
    background-color: ${vars.blue};
  }
`;

const LocalDropdown: AddressBookDropdownProps = {
  name: "Local",
  endpoint: "",
  apiHeader: "",
  apiKey: "",
};

export const AddressBook = styled(({ onAddressSelected, ...props }: AddressBookProps) => {
  const { setOverlayVisible } = useContext(OverlayContext);
  const { thirdPartyAPIEndpoints } = useThirdPartyAPIEndpoints();
  const [searchTerm, setSearchTerm] = useState("");
  const [addressBookDropdown, setAddressBookDropdown] = useState<AddressBookDropdownProps>(LocalDropdown);
  const [addressBookThirdPartyResults, setAddressBookThirdPartyResults] = useState<AddressBookThirdPartyResultsProps[]>(
    []
  );
  const [isSearchingThirdParty, setIsSearchingThirdParty] = useState(false);

  const onAddressSelect = (address: string) => {
    if (onAddressSelected) {
      onAddressSelected(address);
      setOverlayVisible(false);
    }
  };

  const queryEndpoint = debounce((search) => {
    if (addressBookDropdown.apiHeader && addressBookDropdown.apiKey) {
      const headers: HeadersProps = {};
      headers[addressBookDropdown.apiHeader] = addressBookDropdown.apiKey;

      axios
        .get(`${addressBookDropdown.endpoint}search?q=${search}`, {
          headers,
        })
        .then((response) => {
          setAddressBookThirdPartyResults(response.data.identities);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsSearchingThirdParty(false);
        });
    }
  }, 500);

  const setSearchResultsForThirdParty = (search: string) => {
    if (search.length > 2 && addressBookDropdown.name !== "Local") {
      setIsSearchingThirdParty(true);
      queryEndpoint(search);
    } else {
      setIsSearchingThirdParty(false);
      queryEndpoint.cancel();
      setAddressBookThirdPartyResults([]);
    }
  };

  const onSearchTermChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = event.target.value;
    setSearchTerm(inputText);
    setSearchResultsForThirdParty(inputText);
  };

  const onAddressBookNameDropdown = (item: AddressBookDropdownProps) => {
    setAddressBookDropdown(item);
    setSearchTerm("");
    setAddressBookThirdPartyResults([]);
  };

  return (
    <OverlayContent data-testid="overlay-addressbook" {...props}>
      <div className="overlay-actionsbar">
        <Dropdown>
          <StyledDropdownButton variant="transparent" className="mb-2">
            {addressBookDropdown.name}
          </StyledDropdownButton>

          <Dropdown.Menu>
            <StyledDropdownItem
              onClick={() => {
                onAddressBookNameDropdown(LocalDropdown);
              }}
            >
              Local
            </StyledDropdownItem>
            {thirdPartyAPIEndpoints.map((item, index) => {
              return (
                <StyledDropdownItem
                  key={index}
                  onClick={() => {
                    onAddressBookNameDropdown(item);
                  }}
                >
                  {item.name}
                </StyledDropdownItem>
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
      <div className="table-responsive">
        <table className="table">
          {addressBookDropdown.name === "Local" ? (
            <AddressBookLocal onAddressSelect={onAddressSelect} searchTerm={searchTerm} />
          ) : (
            <AddressBookThirdParty
              onAddressSelect={onAddressSelect}
              addressBookThirdPartyResults={addressBookThirdPartyResults}
              isSearchingThirdParty={isSearchingThirdParty}
            />
          )}
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
