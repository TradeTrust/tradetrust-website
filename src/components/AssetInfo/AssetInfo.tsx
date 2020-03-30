import React, { FunctionComponent, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getData, WrappedDocument } from "@govtechsg/open-attestation";
import TokenSideBar from "./TokenSideBar";
import { getTokenUserAddress, initializeToken } from "../../reducers/token";
import { loadAdminAddress } from "../../reducers/admin";
import { makeEtherscanTokenURL } from "../../utils";
import { FeatureFlag } from "../FeatureFlag";
import { useUserWallet } from "../../hooks";
const getAssetInfo = (document: WrappedDocument) => {
  const { tokenRegistry } = getData(document).issuers[0];
  const { merkleRoot: tokenId } = document.signature;
  return { tokenRegistry, tokenId };
};

export const AssetInfo: FunctionComponent<{ document: WrappedDocument }> = ({ document }) => {
  const [isSideBarExpand, toggleSideBar] = useState(false);
  const dispatch = useDispatch();
  const { tokenRegistry: registryAddress, tokenId } = getAssetInfo(document);
  const { state: useWalletState, userWalletAddress, enableMetamask } = useUserWallet();
  const { holderAddress, beneficiaryAddress, initializeTokenSuccess } = useSelector((state: any) => ({
    holderAddress: state.token.holderAddress,
    beneficiaryAddress: state.token.beneficiaryAddress,
    initializeTokenSuccess: state.token.initializeTokenSuccess,
    isEscrowContract: state.token.isEscrowContract
  }));

  useEffect(() => {
    if (registryAddress) dispatch(loadAdminAddress());
  }, [dispatch, document, registryAddress]);

  useEffect(() => {
    if (userWalletAddress) {
      dispatch(initializeToken());
    }
  }, [dispatch, userWalletAddress]);

  useEffect(() => {
    if (initializeTokenSuccess) dispatch(getTokenUserAddress());
  }, [dispatch, initializeTokenSuccess]);

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
    <>
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
            adminAddress={userWalletAddress}
            registryAddress={registryAddress}
            holderAddress={holderAddress}
            beneficiaryAddress={beneficiaryAddress}
            handler={handlerToggleSideBar}
            isSideBarExpand={isSideBarExpand}
          />
        </div>
      </FeatureFlag>
    </>
  );
};
