import React, { useEffect } from "react";
import { TitleView } from "../TitleView";
import { BLinfo } from "../TitleView/BLinfo";
import { useDefaultProvider } from "../../../common/hooks/useDefaultProvider";
import { useTitleEscrowContract } from "../../../common/hooks/useTitleEscrowContract";
import { TitleEscrow } from "@govtechsg/token-registry/types/TitleEscrow";
import { useContractFunctionHook } from "@govtechsg/ethers-contract-hook";

export const TitleTransferPanelContent = ({ titleEscrow }: { titleEscrow: TitleEscrow }) => {
  const { call: getBeneficiary, value: beneficiary } = useContractFunctionHook(titleEscrow, "beneficiary");
  const { call: getHolder, value: holder } = useContractFunctionHook(titleEscrow, "holder");
  useEffect(() => {
    getBeneficiary();
    getHolder();
  }, [titleEscrow]); // eslint-disable-line react-hooks/exhaustive-deps
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
interface TitleTransferPanelContentContainerProps {
  tokenId: string;
  tokenRegistryAddress: string;
}

export const TitleTransferPanelContentContainer = ({
  tokenId,
  tokenRegistryAddress
}: TitleTransferPanelContentContainerProps) => {
  const { provider } = useDefaultProvider(); // Component only need read only access
  const { titleEscrow } = useTitleEscrowContract(tokenRegistryAddress, tokenId, provider);

  return titleEscrow ? <TitleTransferPanelContent titleEscrow={titleEscrow} /> : null;
};
