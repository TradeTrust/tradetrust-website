import { Dropdown, DropdownItem, DropdownProps, IconError } from "@tradetrust-tt/tradetrust-ui-components";
import { isTransferableRecord } from "@trustvc/trustvc";
import { isSignedDocument } from "@trustvc/trustvc/w3c/vc";
import React, { FunctionComponent } from "react";
import { useProviderContext } from "../../../common/contexts/provider";
import { useNetworkSelect } from "../../../common/hooks/useNetworkSelect";
import { getChainInfo } from "../../../common/utils/chain-utils";
import { ChainId, ChainInfoObject } from "../../../constants/chain-info";

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
  const { children, className, disabled, ...rest } = props;
  return (
    <div className={className}>
      <Dropdown
        className="rounded-md py-2 pl-4 p-2 border border-cloud-200 bg-white"
        data-testid="network-selector"
        disabled={disabled}
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
    <div className="bg-white flex justify-start">
      <IconError className="mr-2 w-5 h-5 rounded-full" />
      Unsupported Network
    </div>
  );

  try {
    if (currentChainId) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      selectedLabel = <DropdownItemLabel network={getChainInfo(currentChainId)} />;
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
      classNameShared="w-full xs:max-w-xs"
      disabled={disabled}
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
