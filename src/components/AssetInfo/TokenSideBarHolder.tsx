import React from "react";
import { TransferHoldership } from "./TransferHoldership";
import { SurrenderDocument } from "./SurrenderDocument";
import { TransferBeneficiary } from "./TransferBeneficiary";
import { TitleEscrow } from "@govtechsg/token-registry/types/TitleEscrow";

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
  const showChangeBeneficiary = approvedEscrowContractAddress || isEqualBeneficiaryAndHolder;

  return (
    <>
      <TransferHoldership titleEscrow={titleEscrow} />
      {showChangeBeneficiary && (
        <TransferBeneficiary
          titleEscrow={titleEscrow}
          approvedEscrowContractAddress={approvedEscrowContractAddress}
          registryAddress={registryAddress}
        />
      )}
      {isEqualBeneficiaryAndHolder && <SurrenderDocument registryAddress={registryAddress} titleEscrow={titleEscrow} />}
    </>
  );
};

export default TokenSideBarHolder;
