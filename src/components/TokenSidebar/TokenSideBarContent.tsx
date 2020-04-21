import React, { useEffect, useContext } from "react";
import { useContractFunctionHook } from "@govtechsg/ethers-contract-hook";
import { getLogger } from "../../utils/logger";
import css from "./TokenSideBar.scss";
import TokenSideBarHolder from "./TokenSideBarHolder";
import { EndorseChangeBeneficiary } from "./EndorseChangeBeneficiary";
import TokenSideBarNoMatch from "./TokenSideBarNoMatch";
import TokenTransactionSuccess from "./TokenTransactionSuccess";
import { getSuccessResponse } from "./TokenActionUtil";
const { trace } = getLogger("component:TokenSideBarContent");
import getUserRoles, { UserRole } from "../../utils/UserRolesUtil";
import { NETWORK_NAME } from "../../config";
import { useUserWallet } from "../../common/hooks/useUserWallet";
import { TransactionStateStatus } from "../../common/hooks/useEthereumTransactionState";
import { TitleEscrow } from "@govtechsg/token-registry/types/TitleEscrow";
import { useTitleEscrowUsers } from "../../common/hooks/useTitleEscrowUsers";
import { TokenModuleContext } from "../../common/contexts/tokenModuleContext";
import { checkIfApprovedAddress } from "./TokenActionUtil";
interface TokenSideBarContentProps {
  userWalletAddress: string;
  registryAddress: string;
  titleEscrow: TitleEscrow;
}

const TokenSideBarContent = ({ userWalletAddress, registryAddress, titleEscrow }: TokenSideBarContentProps) => {
  const { beneficiary, holder } = useTitleEscrowUsers({ titleEscrow });
  const userRole = getUserRoles({
    userWalletAddress,
    holderAddress: holder || "",
    beneficiaryAddress: beneficiary || "",
  });
  const tokenSidebarError = { accessDenied: false, networkMismatch: false, metamaskNotFound: false };
  trace(`admin address: ${userWalletAddress}, holder address: ${holder}, beneficiary address: ${beneficiary}`);

  const { state: useWalletState, network } = useUserWallet();
  const { state: tokenState } = useContext(TokenModuleContext);

  const isEqualBeneficiaryAndHolder = userRole === UserRole.HolderBeneficiary;
  const showHolder = userRole === UserRole.Holder || isEqualBeneficiaryAndHolder;
  const showBeneficiary = userRole === UserRole.Beneficiary && !isEqualBeneficiaryAndHolder;
  tokenSidebarError.accessDenied = userRole === UserRole.NoMatch;
  tokenSidebarError.networkMismatch = NETWORK_NAME.toLowerCase() !== network.toLowerCase();
  tokenSidebarError.metamaskNotFound = useWalletState.status === TransactionStateStatus.ERROR;

  trace(`config network: ${NETWORK_NAME} and metamask network: ${network}`);
  trace(`error in sidebar access ${JSON.stringify(tokenSidebarError)}`);

  const { call: getApprovedTitleEscrowAddress, value: approvedEscrowContractAddress } = useContractFunctionHook(
    titleEscrow,
    "approvedTransferTarget"
  );

  useEffect(() => {
    getApprovedTitleEscrowAddress();
  }, [getApprovedTitleEscrowAddress]);
  if (tokenState.transactionHash) {
    const message = getSuccessResponse(tokenState.actionType);
    return <TokenTransactionSuccess hash={tokenState.transactionHash} message={message} />;
  }

  return (
    <>
      {tokenState.showLoader && (
        <div className={css.overlay}>
          <div className="loader" />
        </div>
      )}
      <TokenSideBarNoMatch errorType={tokenSidebarError}>
        <>
          {showHolder && (
            <TokenSideBarHolder
              titleEscrow={titleEscrow}
              isEqualBeneficiaryAndHolder={isEqualBeneficiaryAndHolder}
              approvedEscrowContractAddress={
                checkIfApprovedAddress(approvedEscrowContractAddress) ? approvedEscrowContractAddress : ""
              }
              registryAddress={registryAddress}
            />
          )}
          {showBeneficiary && (
            <EndorseChangeBeneficiary
              titleEscrow={titleEscrow}
              approvedEscrowContractAddress={
                checkIfApprovedAddress(approvedEscrowContractAddress) ? approvedEscrowContractAddress : ""
              }
              registryAddress={registryAddress}
            />
          )}
        </>
      </TokenSideBarNoMatch>
    </>
  );
};

export default TokenSideBarContent;
