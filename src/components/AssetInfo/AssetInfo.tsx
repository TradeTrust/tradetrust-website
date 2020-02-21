import React, { FunctionComponent, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getData, SignedDocument } from "@govtechsg/open-attestation";
import TokenSideBar from "./TokenSideBar";
import { getTokenUserAddress, initializeToken } from "../../reducers/token";
import { updateNetworkId } from "../../reducers/application";
import { loadAdminAddress } from "../../reducers/admin";
import { makeEtherscanTokenURL } from "../../utils";
import { connectToMetamask } from "../../services/etherjs";
import { FeatureFlag } from "../FeatureFlag";

const getAssetInfo = (document: SignedDocument) => {
  const { tokenRegistry } = getData(document).issuers[0];
  const { merkleRoot: tokenId } = document.signature;
  return { tokenRegistry, tokenId };
};

export const AssetInfo: FunctionComponent<{ document: SignedDocument }> = ({ document }) => {
  const [isSideBarExpand, toggleSideBar] = useState(false);
  const dispatch = useDispatch();
  const { tokenRegistry: registryAddress, tokenId } = getAssetInfo(document);

  const { adminAddress, holderAddress, beneficiaryAddress, initializeTokenSuccess, metamaskAccountError } = useSelector(
    (state: any) => ({
      adminAddress: state.admin.adminAddress,
      holderAddress: state.token.holderAddress,
      beneficiaryAddress: state.token.beneficiaryAddress,
      initializeTokenSuccess: state.token.initializeTokenSuccess,
      metamaskAccountError: state.admin.metamaskAccountError,
      isEscrowContract: state.token.isEscrowContract
    })
  );

  useEffect(() => {
    if (registryAddress) dispatch(loadAdminAddress());
  }, [dispatch, document, registryAddress]);

  useEffect(() => {
    if (adminAddress) {
      window.ethereum.on("networkChanged", () => {
        dispatch(updateNetworkId());
        dispatch(initializeToken());
      });
      window.ethereum.on("accountsChanged", () => dispatch(loadAdminAddress()));
      dispatch(initializeToken());
    }
  }, [dispatch, adminAddress]);

  useEffect(() => {
    if (initializeTokenSuccess) dispatch(getTokenUserAddress());
  }, [dispatch, initializeTokenSuccess]);

  const handlerToggleSideBar = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (!adminAddress && metamaskAccountError) {
      await connectToMetamask();
      dispatch(loadAdminAddress());
    }
    toggleSideBar(!isSideBarExpand);
  };

  if (!registryAddress) return null;
  return (
    <>
      <FeatureFlag
        name="MANAGE_ASSET"
        render={() => (
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
              adminAddress={adminAddress}
              registryAddress={registryAddress}
              holderAddress={holderAddress}
              beneficiaryAddress={beneficiaryAddress}
              handler={handlerToggleSideBar}
              isSideBarExpand={isSideBarExpand}
            />
          </div>
        )}
        fallback={() => (
          <a
            href={makeEtherscanTokenURL({ registryAddress, tokenId })}
            id="asset-info-etherscan-link"
            rel="noreferrer noopener"
            target="_blank"
          >
            Manage Asset
          </a>
        )}
      />
    </>
  );
};
