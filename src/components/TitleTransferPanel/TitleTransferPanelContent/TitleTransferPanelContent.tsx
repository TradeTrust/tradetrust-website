import React, { useEffect } from "react";
import { TitleView } from "../TitleView";
import { BLinfo } from "../TitleView/BLinfo";
import { WrappedDocument } from "@govtechsg/open-attestation";
import { useDefaultProvider } from "../../../common/hooks/useDefaultProvider";
import { useTitleEscrowContract } from "../../../common/hooks/useTitleEscrowContract";
import { getDocumentId, getTokenRegistryAddress } from "../../../common/utils/document";
import { TitleEscrow } from "@govtechsg/token-registry/types/TitleEscrow";
import { useContractFunctionHook } from "@govtechsg/ethers-contract-hook";

export const Content = ({ titleEscrow }: { titleEscrow: TitleEscrow }) => {
  const { call: getBeneficiary, value: beneficiary } = useContractFunctionHook(titleEscrow, "beneficiary");
  const { call: getHolder, value: holder } = useContractFunctionHook(titleEscrow, "holder");
  useEffect(() => {
    getBeneficiary();
    getHolder();
  }, [getBeneficiary, getHolder]);
  return (
    <div className="row">
      <div className="col-12 col-lg">
        <TitleView role="Beneficiary" address={beneficiary} />
        <TitleView role="Holder" address={holder} />
      </div>
      <div className="col-12 col-lg">
        <BLinfo />
      </div>
    </div>
  );
};
interface TitleTransferPanelContentProps {
  document: WrappedDocument;
}

export const TitleTransferPanelContent = ({ document }: TitleTransferPanelContentProps) => {
  const tokenId = getDocumentId(document);
  const tokenRegistryAddress = getTokenRegistryAddress(document);
  const { provider } = useDefaultProvider(); // Component only need read only access
  const { titleEscrow } = useTitleEscrowContract(tokenRegistryAddress, tokenId, provider);

  return titleEscrow ? <Content titleEscrow={titleEscrow} /> : null;
};
