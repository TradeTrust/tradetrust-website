import React, { FunctionComponent, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getData, WrappedDocument } from "@govtechsg/open-attestation";
import TokenSideBar from "./TokenSideBar";
import { getTokenUserAddress, initializeToken } from "../../reducers/token";
import { makeEtherscanTokenURL } from "../../utils";
import { FeatureFlag } from "../FeatureFlag";
import {TokenInstanceProviderWithSigner} from "../../common/contexts/tokenInstancesContextWithSigner";

import { useUserWallet } from "../../common/hooks/useUserWallet";
const getAssetInfo = (document: WrappedDocument) => {
  const { tokenRegistry } = getData(document).issuers[0];
  const { merkleRoot: tokenId } = document.signature;
  return { tokenRegistry, tokenId };
};

export const AssetInfo: FunctionComponent<{ document: WrappedDocument }> = ({ document }) => {
  const [isSideBarExpand, toggleSideBar] = useState(false);
  const { tokenRegistry: registryAddress, tokenId } = getAssetInfo(document);
  const { state: useWalletState, userWalletAddress, enableMetamask } = useUserWallet();
  const { holderAddress, beneficiaryAddress } = useSelector((state: any) => ({
    holderAddress: state.token.holderAddress,
    beneficiaryAddress: state.token.beneficiaryAddress,
    isEscrowContract: state.token.isEscrowContract,
  }));

  const handlerToggleSideBar = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (!userWalletAddress && useWalletState.error) {
      await enableMetamask();
    }
    toggleSideBar(!isSideBarExpand);
  };

  if (!registryAddress) return null;

  const legacyView = (
    <a
      href={makeEtherscanTokenURL({ registryAddress, tokenId })}
      id="asset-info-etherscan-link"
      rel="noreferrer noopener"
      target="_blank"
    >
      Manage Asset
    </a>
  );
  return (
    <TokenInstanceProviderWithSigner document={document}>
      <FeatureFlag name="MANAGE_ASSET" fallback={legacyView}>
        <div>
          <a
            href={makeEtherscanTokenURL({ registryAddress, tokenId })}
            id="asset-info-etherscan-link"
            rel="noreferrer noopener"
            target="_blank"
            onClick={handlerToggleSideBar}
          >
            Manage Asset
          </a>
          <TokenSideBar
            userWalletAddress={userWalletAddress}
            registryAddress={registryAddress}
            holderAddress={holderAddress}
            beneficiaryAddress={beneficiaryAddress}
            handler={handlerToggleSideBar}
            isSideBarExpand={isSideBarExpand}
          />
        </div>
      </FeatureFlag>
    </TokenInstanceProviderWithSigner>
  );
};
