import {
  Dropdown,
  DropdownItem,
  DropdownProps,
  OverlayContext,
  showDocumentTransferMessage,
} from "@govtechsg/tradetrust-ui-components";
import React, { FunctionComponent, useContext } from "react";
import styled from "@emotion/styled";
import { ChainId, ChainInfoObject } from "../../../constants/chain-info";
import { useProviderContext } from "../../../common/contexts/provider";
import { getChainInfo } from "../../../common/utils/chain-utils";

interface NetworkSelectViewProps {
  onChange: (network: ChainInfoObject) => void;
  currentChainId: ChainId | undefined;
  networks: ChainInfoObject[];
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
    <div className={className}>
      <Dropdown className="rounded-md py-1 pl-4 p-2 border border-gray-300 bg-white" {...rest}>
        {children}
      </Dropdown>
    </div>
  );
};

const StyledDropdown = styled(WrappedDropdown)`
  display: inline-block;
  min-width: 12.5rem;
  font-size: 0.87rem;

  span.select-msg {
    padding: 0.25rem 0.7rem;
    color: darkgrey;
    cursor: default;
  }
`;

/**
 * Label for the items of the dropdown list
 */
const DropdownItemLabel: FunctionComponent<DropdownItemLabelProps> = ({ className, active, network }) => {
  return (
    <div className={className} data-testid={`network-select-dropdown-label-${network.chainId}`}>
      <img className="network-icon" src={network.iconImage} alt={network.label} />
      <span className="label">{network.label}</span>
      {active ? <span className="active" /> : null}
    </div>
  );
};

const StyledDropdownItemLabel = styled(DropdownItemLabel)`
  display: flex;
  align-items: center;

  & img.network-icon {
    width: 20px;
    height: 20px;
    border-radius: 20px;
    margin-right: 0.5rem;
  }

  & span.label {
    width: 100%;
  }

  & span.active {
    padding: 0.25rem;
    background-color: #27ae60;
    border-radius: 0.5rem;
    justify-self: flex-end;
  }
`;

/**
 * Dropdown item label specially for unsupported networks
 */
const DropdownUnsupportedLabel = styled.div`
  color: #bb2323;

  &::before {
    content: "❌";
    margin-right: 0.5rem;
  }
`;

/**
 * Item component for the dropdown list
 */
const NetworkSelectDropdownItem = (props: NetworkSelectDropdownItemProps) => {
  const { className, network, active, ...rest } = props;
  return (
    <div className={className}>
      <DropdownItem {...rest}>
        <StyledDropdownItemLabel network={network} active={active} />
      </DropdownItem>
    </div>
  );
};

/**
 * Network Selection dropdown component
 */
const NetworkSelectView: FunctionComponent<NetworkSelectViewProps> = ({ onChange, networks, currentChainId }) => {
  const itemsList = networks.map((network, i) => {
    return (
      <NetworkSelectDropdownItem
        key={i}
        network={network}
        active={network.chainId === currentChainId}
        onClick={() => {
          if (onChange) onChange(network);
        }}
      />
    );
  });

  let selectedLabel: React.ReactNode = <DropdownUnsupportedLabel>Unsupported Network</DropdownUnsupportedLabel>;
  try {
    if (currentChainId) {
      selectedLabel = <StyledDropdownItemLabel network={getChainInfo(currentChainId)} />;
    }
  } catch {}

  return (
    <StyledDropdown
      // Unorthodox workaround
      // TODO: Update the dropdownButtonText in Dropdown component in tradetrust-ui-components to remove this workaround
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dropdownButtonText={selectedLabel}
      classNameShared="w-full max-w-xs"
    >
      <div>
        <span className="select-msg">Select a Network</span>
        {itemsList}
      </div>
    </StyledDropdown>
  );
};

export const NetworkSelect: FunctionComponent = () => {
  const { changeNetwork, supportedChainInfoObjects, currentChainId } = useProviderContext();
  const { showOverlay } = useContext(OverlayContext);

  const changeHandler = async (network: ChainInfoObject) => {
    try {
      await changeNetwork(network.chainId);
    } catch (e: any) {
      showOverlay(
        showDocumentTransferMessage("You've cancelled changing network.", {
          isSuccess: false,
        })
      );
    }
  };

  return (
    <NetworkSelectView currentChainId={currentChainId} onChange={changeHandler} networks={supportedChainInfoObjects} />
  );
};
