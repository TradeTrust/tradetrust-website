import React, { FunctionComponent, useState, useEffect } from "react";
import { WrappedDocument } from "@govtechsg/open-attestation";
import TokenSideBar from "./TokenSideBar";
import { makeEtherscanTokenURL } from "../../utils";
import { useProviderContext } from "../../common/contexts/provider";
import { useTitleEscrowContract } from "../../common/hooks/useTitleEscrowContract";
import { getDocumentId, getTokenRegistryAddress } from "../../common/utils/document";
import { useContractFunctionHook } from "@govtechsg/ethers-contract-hook";
import { TitleEscrow } from "@govtechsg/token-registry/types/TitleEscrow";

export const AssetInfo: FunctionComponent<{ document: WrappedDocument }> = ({ document }) => {
  const { provider } = useProviderContext();
  const registryAddress = getTokenRegistryAddress(document);
  const tokenId = getDocumentId(document);
  const { titleEscrow } = useTitleEscrowContract(registryAddress, tokenId, provider);

  if (!titleEscrow) return null;
  return <AssetInfoContent titleEscrow={titleEscrow} registryAddress={registryAddress} tokenId={tokenId} />;
};

interface ManageAssetToggleProps {
  registryAddress: string;
  tokenId: string;
  toggleSidebar: () => Promise<void>;
}

export const ManageAssetToggle: FunctionComponent<ManageAssetToggleProps> = ({
  registryAddress,
  tokenId,
  toggleSidebar,
}) => (
  <a
    href={makeEtherscanTokenURL({ registryAddress, tokenId })}
    id="asset-info-etherscan-link"
    rel="noreferrer noopener"
    target="_blank"
    onClick={(event) => {
      event.preventDefault;
      toggleSidebar();
    }}
  >
    Manage Asset
  </a>
);

interface AssetInfoContentProps {
  titleEscrow: TitleEscrow;
  registryAddress: string;
  tokenId: string;
}

export const AssetInfoContent: FunctionComponent<AssetInfoContentProps> = ({
  titleEscrow,
  registryAddress,
  tokenId,
}) => {
  const { upgradeProvider, isUpgraded, account } = useProviderContext();
  const { call: getHolder, value: holder } = useContractFunctionHook(titleEscrow, "holder");
  const { call: getBeneficiary, value: beneficiary } = useContractFunctionHook(titleEscrow, "beneficiary");

  const [showSidebar, setShowSidebar] = useState(false);

  const handleToggleSidebar = async () => {
    if (!isUpgraded) {
      await upgradeProvider();
    }
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    getHolder();
    getBeneficiary();
  }, [getBeneficiary, getHolder]);

  return (
    <div>
      <ManageAssetToggle tokenId={tokenId} toggleSidebar={handleToggleSidebar} registryAddress={registryAddress} />
      {showSidebar && account && registryAddress && beneficiary && holder && (
        <TokenSideBar
          adminAddress={account}
          registryAddress={registryAddress}
          holderAddress={holder}
          beneficiaryAddress={beneficiary}
          handler={handleToggleSidebar}
        />
      )}
    </div>
  );
};
