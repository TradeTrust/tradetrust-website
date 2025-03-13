import { Dropdown, DropdownItem, DropdownProps, IconError } from "@tradetrust-tt/tradetrust-ui-components";
import React, { FunctionComponent } from "react";
import { ChainId, ChainInfoObject } from "../../../constants/chain-info";
import { useProviderContext } from "../../../common/contexts/provider";
import { getChainInfo } from "../../../common/utils/chain-utils";
import { useNetworkSelect } from "../../../common/hooks/useNetworkSelect";
import { isTransferableRecord } from "@trustvc/trustvc";
import { isSignedDocument } from "@trustvc/w3c-vc";

interface NetworkSelectViewProps {
  onChange: (chainId: ChainId) => void;
  currentChainId: ChainId | undefined;
  networks: ChainInfoObject[];
  disabled?: boolean;
  document?: any;
}

interface NetworkSelectDropdownItemProps extends DropdownItemLabelProps {
  onClick?: () => void;
}

interface DropdownItemLabelProps {
  network: ChainInfoObject;
  className?: string;
  active?: boolean;
}

/**
 * Dropdown control for the network selection
 */
const WrappedDropdown = (props: DropdownProps) => {
  const { children, className, ...rest } = props;
  return (
    <div className={className} style={{ minWidth: "12.5em" }}>
      <Dropdown
        className="rounded-md py-1 pl-4 p-2 border border-cloud-200 bg-white"
        data-testid="network-selector"
        {...rest}
      >
        {children}
      </Dropdown>
    </div>
  );
};

/**
 * Label for the items of the dropdown list
 */
const DropdownItemLabel: FunctionComponent<DropdownItemLabelProps> = ({ className, active, network }) => {
  return (
    <div className={className}>
      <div className="flex items-center" data-testid={`network-select-dropdown-label-${network.chainId}`}>
        <img className="mr-2 w-5 h-5 rounded-full" src={network.iconImage} alt={network.label} />
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
  const { className, network, active, ...rest } = props;
  return (
    <div className={className}>
      <DropdownItem {...rest}>
        <DropdownItemLabel network={network} active={active} />
      </DropdownItem>
    </div>
  );
};

/**
 * Network Selection dropdown component
 */
const NetworkSelectView: FunctionComponent<NetworkSelectViewProps> = ({
  onChange,
  networks,
  currentChainId,
  disabled = false,
  document,
}) => {
  const itemsList = networks.map((network, i) => {
    return (
      <NetworkSelectDropdownItem
        key={i}
        network={network}
        active={network.chainId === currentChainId}
        onClick={() => {
          if (onChange) onChange(network.chainId);
        }}
      />
    );
  });

  let selectedLabel: React.ReactNode = (
    <div className="bg-white">
      <IconError className="mr-2 w-5 h-5 rounded-full" />
      Unsupported Network
    </div>
  );
  try {
    if (currentChainId) {
      selectedLabel = <DropdownItemLabel network={getChainInfo(currentChainId)} />;
    }
  } catch (e: any) {
    console.log(e.message);
  }

  const transferableRecord = document ? isTransferableRecord(document) : false;
  const signedVerifiableCredential = document ? isSignedDocument(document) : false;

  return disabled ? (
    <div
      className="bg-[#e7e4ec] p-3 inline-block text-sm cursor-not-allowed w-full xs:max-w-xs"
      style={{ minWidth: "12.5em" }}
    >
      {!transferableRecord && signedVerifiableCredential ? "-" : selectedLabel}
    </div>
  ) : (
    <WrappedDropdown
      dropdownButtonText={selectedLabel}
      className="flex-1 xs:flex-none inline-block text-sm"
      classNameShared="w-full xs:max-w-xs"
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
}

export const NetworkSelect: FunctionComponent<NetworkSelectProps> = ({ disabled = false, document }) => {
  const { supportedChainInfoObjects, currentChainId } = useProviderContext();
  const { switchNetwork } = useNetworkSelect();

  const changeHandler = async (chainId: ChainId) => {
    if (!disabled) {
      await switchNetwork(chainId);
    }
  };

  return (
    <NetworkSelectView
      currentChainId={currentChainId}
      onChange={changeHandler}
      networks={supportedChainInfoObjects}
      disabled={disabled}
      document={document}
    />
  );
};
