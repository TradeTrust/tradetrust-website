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
  const { call: getHolder, value: holder } = useContractFunctionHook(titleEscrow!, "holder");
  const { call: getBeneficiary, value: beneficiary } = useContractFunctionHook(titleEscrow!, "beneficiary");

  const [isSideBarExpand, toggleSideBar] = useState(false);

  const handlerToggleSideBar = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (!isUpgraded) {
      await upgradeProvider();
    }
    toggleSideBar(!isSideBarExpand);
  };

  useEffect(() => {
    getHolder();
    getBeneficiary();
  }, [document]);

  return (
    <>
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
        {isSideBarExpand && (
          <TokenSideBar
            adminAddress={account || ""} // TODO accounts can be retrieved from inside
            registryAddress={registryAddress}
            holderAddress={holder || ""}
            beneficiaryAddress={beneficiary || ""}
            handler={handlerToggleSideBar}
          />
        )}
      </div>
    </>
  );
};
