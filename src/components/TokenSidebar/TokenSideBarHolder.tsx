import React, { useState, useEffect } from "react";
import { TitleEscrowFactory } from "@govtechsg/token-registry";

import { TransferHoldership } from "./TransferHoldership";
import { SurrenderDocument } from "./SurrenderDocument";
import { TransferBeneficiary } from "./TransferBeneficiary";
import { TitleEscrow } from "@govtechsg/token-registry/types/TitleEscrow";
import { useInjectedProvider } from "../../common/hooks/useInjectedProvider";

interface TokenSideBarHolderProps {
  titleEscrow: TitleEscrow;
  isEqualBeneficiaryAndHolder: boolean;
  approvedEscrowContractAddress: string;
  registryAddress: string;
}

const TokenSideBarHolder = ({
  titleEscrow,
  isEqualBeneficiaryAndHolder,
  approvedEscrowContractAddress,
  registryAddress,
}: TokenSideBarHolderProps) => {
  const [approvedEscrowInstance, setApprovedEscrowInstance] = useState<TitleEscrow | undefined>(undefined);
  const { signer } = useInjectedProvider();
  const showChangeBeneficiary = approvedEscrowContractAddress || isEqualBeneficiaryAndHolder;
  useEffect(() => {
    const instance = TitleEscrowFactory.connect(approvedEscrowContractAddress, signer);
    setApprovedEscrowInstance(instance);
  }, [approvedEscrowContractAddress, signer]);
  return (
    <>
      <TransferHoldership titleEscrow={titleEscrow} />
      {showChangeBeneficiary && approvedEscrowInstance && (
        <TransferBeneficiary
          titleEscrow={titleEscrow}
          approvedEscrowInstance={approvedEscrowInstance}
          approvedEscrowContractAddress={approvedEscrowContractAddress}
          registryAddress={registryAddress}
        />
      )}
      {isEqualBeneficiaryAndHolder && <SurrenderDocument registryAddress={registryAddress} titleEscrow={titleEscrow} />}
    </>
  );
};

export default TokenSideBarHolder;
