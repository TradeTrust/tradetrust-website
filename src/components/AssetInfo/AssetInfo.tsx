import React, { FunctionComponent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getData, SignedDocument } from "@govtechsg/open-attestation";
import { loadAdminAddress } from "../../reducers/admin";
import { makeEtherscanTokenURL } from "../../utils";
import { FeatureFlag } from "../FeatureFlag";

const getAssetInfo = (document: SignedDocument) => {
  const { tokenRegistry } = getData(document).issuers[0];
  const { merkleRoot: tokenId } = document.signature;
  return { tokenRegistry, tokenId };
};

export const AssetInfo: FunctionComponent<{ document: SignedDocument; handleToggleSideBar: any }> = ({
  document,
  handleToggleSideBar
}) => {
  const dispatch = useDispatch();
  const { tokenRegistry: registryAddress, tokenId } = getAssetInfo(document);

  useEffect(() => {
    if (registryAddress) dispatch(loadAdminAddress());
  }, [dispatch, document, registryAddress]);

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
              onClick={handleToggleSideBar}
            >
              Manage Asset
            </a>
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
