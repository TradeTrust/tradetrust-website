import { IconError, LoaderSpinner } from "@tradetrust-tt/tradetrust-ui-components";
import { isTransferableRecord } from "@trustvc/trustvc";
import { isSignedDocument } from "@trustvc/trustvc/w3c/vc";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Info } from "react-feather";
import { SIGNER_TYPE, useProviderContext } from "../../../common/contexts/provider";
import { useNetworkSelect } from "../../../common/hooks/useNetworkSelect";
import { getChainInfo } from "../../../common/utils/chain-utils";
import { ChainId, ChainInfoObject } from "../../../constants/chain-info";
import { Dropdown, DropdownItem, DropdownProps } from "../../Dropdown";

interface NetworkSelectViewProps {
  onChange: (chainId: ChainId) => Promise<void>;
  disabled?: boolean;
  document?: any;
  networkChangeLoading?: boolean;
}

interface NetworkSelectDropdownItemProps extends DropdownItemLabelProps {
  onClick?: () => void;
  networkChangeLoading?: boolean;
}

interface DropdownItemLabelProps {
  network: ChainInfoObject;
  className?: string;
  active?: boolean;
  networkChangeLoading?: boolean;
}

/**
 * Dropdown control for the network selection
 */
const WrappedDropdown = (props: DropdownProps & { networkChangeLoading?: boolean; providerType?: SIGNER_TYPE }) => {
  const { children, className, disabled, networkChangeLoading, providerType, ...rest } = props;
  return (
    <div className={className}>
      <Dropdown
        className="rounded-md py-2 pl-4 p-2 border border-cloud-200 bg-white"
        data-testid="network-selector"
        disabled={disabled || networkChangeLoading}
        menuPortalTarget={document.body}
        {...rest}
      >
        {children}
      </Dropdown>
      {networkChangeLoading && (
        <div className="flex flex-row items-center mt-2 gap-2">
          <Info size={16} color="#6E787F" />
          <div className="">
            <span className="text-cloud-500 text-xs">Changing network...</span>
            {providerType === SIGNER_TYPE.METAMASK && (
              <span className="text-cloud-500 text-xs ml-1">Please respond to the metamask window</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Label for the items of the dropdown list
 */
const DropdownItemLabel: FunctionComponent<DropdownItemLabelProps> = ({
  className,
  active,
  network,
  networkChangeLoading,
}) => {
  return (
    <div className={className}>
      <div className="flex items-center" data-testid={`network-select-dropdown-label-${network.chainId}`}>
        {networkChangeLoading ? (
          <LoaderSpinner className="ml mr-2 w-5 h-5" />
        ) : (
          <img className="ml mr-2 w-5 h-5 rounded-full" src={network.iconImage} alt={network.label} />
        )}
        <span className="w-full text-left">{network.label}</span>
        {active ? <span className="m-1 p-1 bg-forest-500 rounded-lg justify-self-end" /> : null}
      </div>
    </div>
  );
};

/**
 * Item component for the dropdown list
 */
const NetworkSelectDropdownItem = (props: NetworkSelectDropdownItemProps) => {
  const { className, network, active, networkChangeLoading, ...rest } = props;
  return (
    <div className={className}>
      <DropdownItem {...rest}>
        <DropdownItemLabel network={network} active={active} networkChangeLoading={networkChangeLoading} />
      </DropdownItem>
    </div>
  );
};

/**
 * Network Selection dropdown component
 */
const NetworkSelectView: FunctionComponent<NetworkSelectViewProps> = ({ onChange, disabled = false, document }) => {
  const {
    networkChangeLoading,
    setNetworkChangeLoading,
    currentChainId,
    supportedChainInfoObjects: networks,
    providerType,
  } = useProviderContext();
  const [changingNetwork, setChangingNetwork] = useState<ChainId | undefined>(undefined);

  useEffect(() => {
    if (currentChainId === changingNetwork) {
      setChangingNetwork(undefined);
      setNetworkChangeLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChainId, changingNetwork]);

  const itemsList = networks.map((network, i) => {
    return (
      <NetworkSelectDropdownItem
        key={i}
        network={network}
        active={network.chainId === currentChainId}
        networkChangeLoading={networkChangeLoading}
        onClick={() => {
          setChangingNetwork(network.chainId);
          if (onChange) onChange(network.chainId);
        }}
      />
    );
  });

  let selectedLabel: React.ReactNode = (
    <div className={`${disabled ? "bg-gray-200" : "bg-white"} flex justify-start`}>
      <IconError className="mr-2 w-5 h-5 rounded-full" />
      Unsupported Network
    </div>
  );

  try {
    if (currentChainId) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      selectedLabel = (
        <DropdownItemLabel
          network={getChainInfo(changingNetwork ?? currentChainId)}
          networkChangeLoading={networkChangeLoading}
        />
      );
    }
  } catch (e: any) {
    console.log(e.message);
  }

  const defaultEmptyLabel: React.ReactNode = <div className="w-full flex justify-start">-</div>;

  const transferableRecord = document ? isTransferableRecord(document) : false;
  const signedVerifiableCredential = document ? isSignedDocument(document) : false;

  return (
    <WrappedDropdown
      dropdownButtonText={
        disabled && !transferableRecord && signedVerifiableCredential ? defaultEmptyLabel : selectedLabel
      }
      className="flex-1 inline-block text-sm"
      classNameShared="w-full"
      disabled={disabled}
      networkChangeLoading={networkChangeLoading}
      providerType={providerType}
    >
      <div>
        <span className="text-cloud-500 p-3 pr-8 cursor-default">Select a Network</span>
        {itemsList}
      </div>
    </WrappedDropdown>
  );
};

interface NetworkSelectProps {
  disabled?: boolean;
  document?: any;
  inPlaceLoading?: boolean;
}

export const NetworkSelect: FunctionComponent<NetworkSelectProps> = ({
  disabled = false,
  document,
  inPlaceLoading = false,
}) => {
  const { switchNetwork } = useNetworkSelect({ inPlaceLoading });

  const changeHandler = async (chainId: ChainId) => {
    if (!disabled) {
      await switchNetwork(chainId);
    }
  };

  return <NetworkSelectView onChange={changeHandler} disabled={disabled} document={document} />;
};
