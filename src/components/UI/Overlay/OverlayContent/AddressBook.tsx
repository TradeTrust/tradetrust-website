import styled from "@emotion/styled";
import { Dropdown, DropdownItem } from "@govtechsg/tradetrust-ui-components";
import { debounce } from "lodash";
import React, { useCallback, useContext, useState } from "react";
import { Download, Search } from "react-feather";
import { useThirdPartyAPIEndpoints } from "../../../../common/hooks/useThirdPartyAPIEndpoints";
import { AddressBookThirdPartyResultsProps, entityLookup } from "../../../../services/addressResolver";
import { vars } from "../../../../styles";
import { CsvUploadButton } from "../../../AddressBook/CsvUploadButton";
import { AnchorLinkButtonSolidWhiteBlue } from "../../../UI/Button";
import { OverlayContext } from "./../../../../common/contexts/OverlayContext";
import { TableStyle } from "./../../../AddressResolver/AddressesTable";
import { OverlayContentBaseStyle } from "./../Overlay";
import { AddressBookLocal } from "./AddressBookLocal";
import { AddressBookThirdParty } from "./AddressBookThirdParty";
import { OverlayContent, OverlayContentProps } from "./index";

export interface AddressBookDropdownProps {
  name: string;
  endpoint: string;
  apiHeader: string;
  apiKey: string;
}

interface AddressBookProps extends OverlayContentProps {
  onAddressSelected?: (newValue: string) => void;
}

export const AddressBook = styled(({ onAddressSelected, ...props }: AddressBookProps) => {
  const { setOverlayVisible } = useContext(OverlayContext);
  const { thirdPartyAPIEndpoints } = useThirdPartyAPIEndpoints();
  const [searchTerm, setSearchTerm] = useState("");

  const [isLocal, setIsLocal] = useState(true);
  const [remoteEndpointIndex, setRemoteEndpointIndex] = useState(0);
  const [isPendingRemoteResults, setIsPendingRemoteResults] = useState(false);
  const [addressBookThirdPartyResults, setAddressBookThirdPartyResults] = useState<AddressBookThirdPartyResultsProps[]>(
    []
  );
  const { name, endpoint, apiHeader, apiKey } = thirdPartyAPIEndpoints[remoteEndpointIndex] ?? {};

  const onAddressSelect = (address: string) => {
    if (onAddressSelected) {
      onAddressSelected(address);
      setOverlayVisible(false);
    }
  };

  const queryEndpoint = useCallback(
    debounce(async (search) => {
      setIsPendingRemoteResults(true);

      try {
        const results = await entityLookup({
          query: search,
          endpoint,
          apiHeader,
          apiKey,
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
        <Dropdown
          fullWidth
          dropdownButtonText={`${isLocal ? "Local" : name}`}
          className="border-grey-light border-solid border rounded-none p-3 hover:bg-grey-lightest"
        >
          <DropdownItem
            onClick={() => {
              setIsLocal(true);
              setSearchTerm("");
            }}
          >
            Local
          </DropdownItem>
          {thirdPartyAPIEndpoints.map((item, index) => {
            return (
              <DropdownItem
                key={index}
                onClick={() => {
                  setIsLocal(false);
                  setSearchTerm("");
                  setRemoteEndpointIndex(index);
                }}
              >
                {item.name}
              </DropdownItem>
            );
          })}
        </Dropdown>
        <div className="flex flex-wrap items-center">
          <div className="w-full md:w-1/3 my-2 md:mb-0">
            <div className="overlay-searchbar">
              <div className="flex items-center">
                <input type="text" placeholder="Search" value={searchTerm} onChange={onSearchTermChanged} />
                <Search />
              </div>
            </div>
          </div>
          <div className="w-full md:w-auto md:ml-auto">
            <div className="flex flex-wrap">
              <div className="w-full md:w-auto mb-2 md:mb-0 md:mr-2">
                <AnchorLinkButtonSolidWhiteBlue
                  href="data:text/csv;base64,QWRkcmVzcyxJZGVudGlmaWVyCjB4YTYxQjA1NmRBMDA4NGE1ZjM5MUVDMTM3NTgzMDczMDk2ODgwQzJlMyxEQlMKMHgyOEY3YUIzMkM1MjFEMTNGMkU2OTgwZDA3MkNhN0NBNDkzMDIwMTQ1LFN0YW5kYXJkIENoYXJ0ZXJlZA"
                  download="template.csv"
                >
                  <div className="flex items-center">
                    <div className="w-auto mr-2">
                      <Download />
                    </div>
                    <div className="w-auto">Download template</div>
                  </div>
                </AnchorLinkButtonSolidWhiteBlue>
              </div>
              <div className="w-full md:w-auto">
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
      cursor: ${(props) => (props.onAddressSelected ? "cursor-pointer" : "default")};

      &:hover {
        background-color: ${(props) => (props.onAddressSelected ? vars.greyLighter : "inherit")};

        &:nth-of-type(even) {
          background-color: ${(props) => (props.onAddressSelected ? vars.greyLighter : "inherit")};
        }
      }

      a {
        color: ${vars.brandBlue};
        svg {
          max-width: 16px;
        }
      }
    }
  }

  .table {
    th {
      width: 120px;
      text-align: left;
      padding: 0.75rem;
    }
  }
`;
