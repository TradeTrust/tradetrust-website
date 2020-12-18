import styled from "@emotion/styled";
import React, { FunctionComponent } from "react";
import tw from "twin.macro";
import { AddressInfo } from "../../AddressInfo";
import { ExternalLinkEtherscanAddress } from "../../UI/ExternalLink";

interface AssetInformationPanel {
  tokenRegistryAddress: string;
  setShowEndorsementChain: (payload: boolean) => void;
}

export const AssetInformationPanel: FunctionComponent<AssetInformationPanel> = styled(
  ({ tokenRegistryAddress, setShowEndorsementChain, className }) => {
    return (
      <div className={`py-4 ${className}`}>
        <AddressInfo title="BL information" name="" resolvedBy="" source="">
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
    ${tw`text-blue cursor-pointer transition-colors duration-300 ease-out`}

    &:hover {
      ${tw`text-blue-800 underline`}
    }
  }
`;
