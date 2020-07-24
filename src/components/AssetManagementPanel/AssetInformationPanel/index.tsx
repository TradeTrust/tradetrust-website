import styled from "@emotion/styled";
import { darken } from "polished";
import React, { FunctionComponent } from "react";
import { vars } from "../../../styles";
import { AddressInfo } from "../../AddressInfo";
import { ExternalLinkEtherscanAddress } from "../../UI/ExternalLink";

interface AssetInformationPanel {
  tokenRegistryAddress: string;
  setShowEndorsementChain: (payload: boolean) => void;
}

export const AssetInformationPanel: FunctionComponent<AssetInformationPanel> = styled(
  ({ tokenRegistryAddress, setShowEndorsementChain, className }) => {
    return (
      <div className={`py-3 ${className}`}>
        <AddressInfo title="BL information" name="">
          <div>
            <ExternalLinkEtherscanAddress name="View BL Registry" address={tokenRegistryAddress} />
          </div>
          <div
            onClick={() => setShowEndorsementChain(true)}
            className="endorsement-chain-button"
            id="endorsement-chain-button"
          >
            View Endorsement Chain
          </div>
        </AddressInfo>
      </div>
    );
  }
)`
  .endorsement-chain-button {
    color: ${vars.brandBlue};
    cursor: pointer;
    transition: color 0.3s ${vars.easeOutCubic};

    &:hover {
      color: ${darken(0.2, vars.brandBlue)};
      text-decoration: underline;
    }
  }
`;
