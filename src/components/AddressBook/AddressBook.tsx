import {
  AddressBookThirdPartyResultsProps,
  entityLookup,
  useAddressBook,
  useThirdPartyAPIEndpoints,
} from "@tradetrust-tt/address-identity-resolver";
import { debounce, isEmpty } from "lodash";
import React, { FunctionComponent, useCallback, useEffect, useState } from "react";
import { Download, Search } from "react-feather";
import { OverlayContent, OverlayContentProps } from "../UI/Overlay/OverlayContent";
import { AddressBookLocal } from "./AddressBookLocal";
import { AddressBookThirdParty } from "./AddressBookThirdParty";
import { CsvUploadButton } from "./CsvUploadButton";
import { useOverlayContext } from "../../common/contexts/OverlayContext";
import { Dropdown, DropdownItem } from "../Dropdown";
import { LinkButton } from "../Button";
import { Pagination } from "../Pagination";

export enum AddressBookState {
  NONE = "NONE",
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  EMPTY = "EMPTY",
  ERROR = "ERROR",
}

type onAddressSelectType = (address: string) => void;

export interface AddressBookProps {
  network?: string;
  onAddressSelect?: onAddressSelectType;
  paginationOffset?: number;
  paginationLimit?: number;
  className?: string;
}

export const AddressBook: FunctionComponent<AddressBookProps> = ({
  network,
  onAddressSelect,
  paginationOffset = 0,
  paginationLimit = 10,
  ...props
}) => {
  const { thirdPartyAPIEndpoints } = useThirdPartyAPIEndpoints();

  const { handleLocalAddressBookCsv, addressBook } = useAddressBook();
  const [searchTerm, setSearchTerm] = useState("");

  const [isLocal, setIsLocal] = useState(true);
  const [remoteEndpointIndex, setRemoteEndpointIndex] = useState(0);
  const [thirdPartyPageResults, setThirdPartyPageResults] = useState<AddressBookThirdPartyResultsProps[]>([]);
  const { name, endpoint, apiHeader, apiKey, path } = thirdPartyAPIEndpoints[remoteEndpointIndex] ?? {};
  const [thirdPartyTotalPages, setThirdPartyTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const hasEntityLookupPath = !!path?.entityLookup;

  const filteredLocalAddresses = Object.keys(addressBook).filter((key) => {
    const identifier = addressBook[key];
    return (
      identifier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      key.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const localTotalPages = Math.ceil(filteredLocalAddresses.length / paginationLimit);
  const totalNoOfPages = isLocal ? localTotalPages : thirdPartyTotalPages;
  const offset = (currentPage - 1) * paginationLimit || paginationOffset;
  const localPageResults = filteredLocalAddresses.slice(offset, offset + paginationLimit);

  const [addressBookThirdPartyStatus, setAddressBookThirdPartyStatus] = useState(
    hasEntityLookupPath ? AddressBookState.NONE : AddressBookState.ERROR
  );
  const [addressBookLocalStatus, setAddressBookLocalStatus] = useState(AddressBookState.NONE);

  const queryEndpoint = async (search: string, pageOffset: number): Promise<void> => {
    if (!path.entityLookup) {
      throw "This endpoint does not have the entityLookup feature.";
    }

    setAddressBookThirdPartyStatus(AddressBookState.PENDING);

    try {
      const results = await entityLookup({
        offset: pageOffset.toString(),
        limit: paginationLimit.toString(),
        query: search,
        endpoint,
        apiHeader,
        apiKey,
        path: path.entityLookup,
      });
      setThirdPartyPageResults(results.identities);
      const numberOfResults = results.total > 0 ? results.total : paginationLimit;
      setThirdPartyTotalPages(Math.ceil(numberOfResults / paginationLimit));
      if (isEmpty(results.identities)) {
        setAddressBookThirdPartyStatus(AddressBookState.EMPTY);
      } else {
        setAddressBookThirdPartyStatus(AddressBookState.SUCCESS);
      }
    } catch (e) {
      setThirdPartyPageResults([]);
      setThirdPartyTotalPages(1);
      setAddressBookThirdPartyStatus(AddressBookState.EMPTY);
      console.log(e);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const queryEndpointWithDebounce = useCallback(
    debounce(async (search, pageOffset = offset) => {
      queryEndpoint(search, pageOffset);
    }, 700),
    []
  );

  useEffect(() => {
    if (isLocal) return;
    const pageOffset = (currentPage - 1) * paginationLimit;
    queryEndpoint(searchTerm, pageOffset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    if (isEmpty(addressBook)) {
      setAddressBookLocalStatus(AddressBookState.NONE);
    } else if (isEmpty(localPageResults)) {
      setAddressBookLocalStatus(AddressBookState.EMPTY);
    } else {
      setAddressBookLocalStatus(AddressBookState.SUCCESS);
    }
  }, [addressBook, localPageResults]);

  const onSearchTermChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const inputText = event.target.value;
    setSearchTerm(inputText);
    setCurrentPage(1);
    if (!isLocal) queryEndpointWithDebounce(inputText);
  };

  const resetThirdPartyAPIEndpointResult = (): void => {
    setSearchTerm("");
    setCurrentPage(1);
    setThirdPartyPageResults([]);
    setThirdPartyTotalPages(1);
  };

  return (
    <div {...props}>
      <div className="flex flex-col items-start mb-2 lg:flex-row">
        <div className="flex flex-grow">
          <Dropdown
            dropdownButtonText={isLocal ? "Local" : name}
            className="bg-white text-base text-cloud-800 border-cloud-100 border rounded-md mb-2 p-3"
            classNameShared="w-60"
          >
            <DropdownItem
              onClick={() => {
                setIsLocal(true);
                resetThirdPartyAPIEndpointResult();
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
                    setRemoteEndpointIndex(index);
                    resetThirdPartyAPIEndpointResult();
                  }}
                >
                  {item.name}
                </DropdownItem>
              );
            })}
          </Dropdown>
        </div>
        <div className="flex mt-4 lg:mx-0 lg:mt-0">
          <div className="w-auto">
            <LinkButton
              className="bg-white rounded-xl text-cerulean-500 hover:bg-gray-50"
              href="data:text/csv;base64,QWRkcmVzcyxJZGVudGlmaWVyCjB4YTYxQjA1NmRBMDA4NGE1ZjM5MUVDMTM3NTgzMDczMDk2ODgwQzJlMyxEQlMKMHgyOEY3YUIzMkM1MjFEMTNGMkU2OTgwZDA3MkNhN0NBNDkzMDIwMTQ1LFN0YW5kYXJkIENoYXJ0ZXJlZA"
              download="template.csv"
            >
              <div className="flex items-center mx-0">
                <div className="col-auto mr-2">
                  <Download />
                </div>
                <h5 className="col-auto text-base">Download Template</h5>
              </div>
            </LinkButton>
          </div>
          <div className="w-auto">
            <CsvUploadButton handleLocalAddressBookCsv={handleLocalAddressBookCsv} />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-7 mt-6 lg:mt-0">
        <div className="flex mb-2 flex-grow justify-center lg:justify-start">
          <div
            className={`bg-white max-w-full border border-cloud-100 rounded-md px-3 py-2 ${
              !isLocal && !hasEntityLookupPath ? "cursor-not-allowed bg-cloud-100" : ""
            }`}
          >
            <div className="flex mx-0 items-center">
              <Search className="stroke-2 h-4 w-4 text-cloud-800" />
              <input
                className="w-full ml-2 placeholder-cloud-300 "
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={onSearchTermChanged}
                disabled={!isLocal && !hasEntityLookupPath}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 lg:mt-9">
          {isLocal ? (
            <AddressBookLocal
              addressBookLocalStatus={addressBookLocalStatus}
              onAddressSelect={onAddressSelect}
              localPageResults={localPageResults}
              network={network}
            />
          ) : (
            <AddressBookThirdParty
              addressBookThirdPartyStatus={addressBookThirdPartyStatus}
              onAddressSelect={onAddressSelect}
              thirdPartyPageResults={thirdPartyPageResults}
              network={network}
            />
          )}
        </div>
      </div>
      <div className="mt-4">
        <Pagination totalNoOfPages={totalNoOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
};

export interface OverlayAddressBookProps extends OverlayContentProps {
  network: string;
  onAddressSelected?: (newValue: string) => void;
}

export const OverlayAddressBook: FunctionComponent<OverlayAddressBookProps> = ({
  network,
  onAddressSelected,
  ...props
}: OverlayAddressBookProps) => {
  const { setOverlayVisible } = useOverlayContext();

  const onAddressSelect: onAddressSelectType = (address) => {
    if (onAddressSelected) {
      onAddressSelected(address);
      setOverlayVisible(false);
    }
  };

  return (
    <OverlayContent data-testid="overlay-addressbook" className="bg-white max-w-6xl" {...props} maxHeight={600}>
      <AddressBook network={network} onAddressSelect={onAddressSelect} />
    </OverlayContent>
  );
};
