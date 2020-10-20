import React, { useState, useContext, useCallback } from "react";
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
import { debounce } from "lodash";
import { AddressBookLocal } from "./AddressBookLocal";
import { AddressBookThirdParty } from "./AddressBookThirdParty";
import { entityLookup, AddressBookThirdPartyResultsProps } from "../../../../services/addressResolver";
import { getFeatures } from "../../../../services/addressResolver";

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

export const AddressBook = styled(({ onAddressSelected, ...props }: AddressBookProps) => {
  const { setOverlayVisible } = useContext(OverlayContext);
  const { thirdPartyAPIEndpoints, getFeature } = useThirdPartyAPIEndpoints();
  const [searchTerm, setSearchTerm] = useState("");

  const [isLocal, setIsLocal] = useState(true);
  const [remoteEndpointIndex, setRemoteEndpointIndex] = useState(0);
  const [isPendingRemoteResults, setIsPendingRemoteResults] = useState(false);
  const [addressBookThirdPartyResults, setAddressBookThirdPartyResults] = useState<AddressBookThirdPartyResultsProps[]>(
    []
  );
  const { name, endpoint, apiHeader, apiKey } = thirdPartyAPIEndpoints[remoteEndpointIndex] ?? {};
  const entityLookupPath = getFeature("ENTITY_LOOKUP", remoteEndpointIndex);

  const onAddressSelect = (address: string) => {
    if (onAddressSelected) {
      onAddressSelected(address);
      setOverlayVisible(false);
    }
  };

  const queryEndpoint = useCallback(
    debounce(async (search) => {
      if (!entityLookupPath) throw new Error(`entityLookup feature is not available`);
      setIsPendingRemoteResults(true);

      try {
        const results = await entityLookup({
          query: search,
          endpoint,
          apiHeader,
          apiKey,
          path: entityLookupPath,
        });
        setAddressBookThirdPartyResults(results);
      } catch (e) {
        setAddressBookThirdPartyResults([]);
        queryEndpoint.cancel();
        console.log(e, "error");
      }

      setIsPendingRemoteResults(false);
    }, 1000),
    []
  );

  const onSearchTermChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = event.target.value;
    setSearchTerm(inputText);
    if (!isLocal) queryEndpoint(inputText);
  };

  return (
    <OverlayContent data-testid="overlay-addressbook" {...props}>
      <div className="overlay-actionsbar">
        <Dropdown>
          <StyledDropdownButton variant="transparent" className="mb-2">
            {isLocal ? "Local" : name}
          </StyledDropdownButton>

          <Dropdown.Menu>
            <StyledDropdownItem
              onClick={() => {
                setIsLocal(true);
                setSearchTerm("");
              }}
            >
              Local
            </StyledDropdownItem>
            {thirdPartyAPIEndpoints.map((item, index) => {
              return (
                <StyledDropdownItem
                  key={index}
                  onClick={() => {
                    setIsLocal(false);
                    setSearchTerm("");
                    setRemoteEndpointIndex(index);
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
        {isLocal ? (
          <AddressBookLocal onAddressSelect={onAddressSelect} searchTerm={searchTerm} />
        ) : (
          <AddressBookThirdParty
            onAddressSelect={onAddressSelect}
            addressBookThirdPartyResults={addressBookThirdPartyResults}
            isSearchingThirdParty={isPendingRemoteResults}
          />
        )}
      </div>
    </OverlayContent>
  );
})`
  ${OverlayContentBaseStyle()}
  ${TableStyle()}

  max-width: 960px;
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
