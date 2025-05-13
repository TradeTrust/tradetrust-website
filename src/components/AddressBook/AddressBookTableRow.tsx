import React, { FunctionComponent } from "react";
import { ExternalLink } from "react-feather";
import { makeAddressURL } from "../../utils";

interface AddressBookTableRowProps {
  onAddressSelect: () => void;
  address: string;
  isLocal: boolean;
  name: string;
  network?: string;
  source?: string;
}

interface AddressBookEtherscanLinkProps {
  address: string;
  network: string;
}

const AddressBookEtherscanLink: FunctionComponent<AddressBookEtherscanLinkProps> = ({ address, network }) => {
  const addressHref = makeAddressURL(address, network);
  return (
    <a
      className="inline-block text-cerulean-300 hover:text-cerulean-800"
      href={addressHref}
      target="_blank"
      rel="noreferrer noopener"
    >
      <ExternalLink />
    </a>
  );
};

export const AddressBookTableRow: FunctionComponent<AddressBookTableRowProps> = ({
  onAddressSelect,
  isLocal,
  address,
  name,
  network,
  source,
}) => {
  return (
    <div
      className={`flex flex-col bg-white text-cloud-800 text-sm p-4 lg:flex-row even:bg-cerulean-50 break-words`}
      onClick={onAddressSelect}
      data-testid="table-row"
    >
      <h6 className="mb-2 lg:mb-0 w-full lg:w-3/12">{name}</h6>
      <h6 className="mb-2 lg:mb-0 w-full lg:w-5/12">{address}</h6>
      <h6 className="mb-2 lg:mb-0 w-full lg:w-3/12">{!isLocal && source}</h6>
      {network && (
        <div className="w-full lg:w-1/12 lg:text-right">
          <AddressBookEtherscanLink address={address} network={network} />
        </div>
      )}
    </div>
  );
};

interface AddressBookTableRowEmptyProps {
  message: string;
}

export const AddressBookTableRowEmpty: FunctionComponent<AddressBookTableRowEmptyProps> = ({ message }) => {
  return (
    <div className="bg-cerulean-50 py-3 text-center">
      <p>{message} </p>
    </div>
  );
};
