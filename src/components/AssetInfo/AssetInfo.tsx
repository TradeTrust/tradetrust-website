import React, { FunctionComponent, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getData, SignedDocument } from "@govtechsg/open-attestation";
import TokenSideBar from "./TokenSideBar";
import { getTokenUserAddress, initializeToken } from "../../reducers/token";
import { loadAdminAddress } from "../../reducers/admin";
import { makeEtherscanTokenURL } from "../../utils";
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

  const {
    adminAddress,
    holderAddress,
    beneficiaryAddress,
    approvedBeneficiaryAddress,
    initializeTokenSuccess
  } = useSelector((state: any) => ({
    adminAddress: state.admin.adminAddress,
    holderAddress: state.token.holderAddress,
    beneficiaryAddress: state.token.beneficiaryAddress,
    approvedBeneficiaryAddress: state.token.approvedBeneficiaryAddress,
    initializeTokenSuccess: state.token.initializeTokenSuccess,
    isEscrowContract: state.token.isEscrowContract
  }));

  useEffect(() => {
    if (registryAddress) dispatch(loadAdminAddress());
  }, [dispatch, document, registryAddress]);

  useEffect(() => {
    if (adminAddress) dispatch(initializeToken());
  }, [dispatch, adminAddress]);

  useEffect(() => {
    if (initializeTokenSuccess) dispatch(getTokenUserAddress());
  }, [dispatch, initializeTokenSuccess]);

  const handlerToggleSideBar = (event: { preventDefault: () => void }) => {
    event.preventDefault();
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
              holderAddress={holderAddress}
              beneficiaryAddress={beneficiaryAddress}
              approvedBeneficiaryAddress={approvedBeneficiaryAddress}
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
