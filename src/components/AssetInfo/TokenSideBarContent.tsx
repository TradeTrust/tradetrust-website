import React, { useState, useEffect } from "react";
import { useContractFunctionHook } from "@govtechsg/ethers-contract-hook";
import { getLogger } from "../../utils/logger";
import css from "./TokenSideBar.scss";
import TokenSideBarHolder from "./TokenSideBarHolder";
import TokenSideBarBeneficiary from "./TokenSideBarBeneficiary";
import TokenSideBarNoMatch from "./TokenSideBarNoMatch";
import { endorseTransfer, deployEscrowContract } from "../../services/token";
import TokenTransactionSuccess from "./TokenTransactionSuccess";
import { TOKEN_ACTION_TYPES, getSuccessResponse, checkIfApprovedAddress } from "./TokenActionUtil";
const { trace, error } = getLogger("component:TokenSideBarContent");
import getUserRoles, { UserRole } from "../../utils/UserRolesUtil";
import { useSelector } from "react-redux";
import { NETWORK_NAME } from "../../config";
import { useUserWallet } from "../../common/hooks/useUserWallet";
import { TransactionStateStatus } from "../../common/hooks/useEthereumTransactionState";
import { TitleEscrow } from "@govtechsg/token-registry/types/TitleEscrow";
import { useTitleEscrowUsers } from "../../common/hooks/useTitleEscrowUsers";
interface TokenSideBarContentProps {
  userWalletAddress: string;
  registryAddress: string;
  titleEscrowInstance: TitleEscrow;
}

const TokenSideBarContent = ({ userWalletAddress, registryAddress, titleEscrowInstance }: TokenSideBarContentProps) => {
  const { beneficiary, holder } = useTitleEscrowUsers({ titleEscrow: titleEscrowInstance });
  const userRole = getUserRoles({
    userWalletAddress,
    holderAddress: holder || "",
    beneficiaryAddress: beneficiary || "",
  });
  const [newHolder, setNewHolder] = useState("");
  const [approvedBeneficiary, setApprovedBeneficiary] = useState("");
  const [approvedHolder, setApprovedHolder] = useState("");

  const tokenSidebarError = { accessDenied: false, networkMismatch: false, metamaskNotFound: false };
  trace(`admin address: ${userWalletAddress}, holder address: ${holder}, beneficiary address: ${beneficiary}`);
  const [showActionLoader, toggleActionLoader] = useState(false);
  const [actionError, setActionError] = useState<{ type: TOKEN_ACTION_TYPES; message: string } | null>(null);

  const [actionType, setActionType] = useState<TOKEN_ACTION_TYPES>(TOKEN_ACTION_TYPES.CHANGE_HOLDER);

  const { state: useWalletState, network } = useUserWallet();

  const { approvedBeneficiaryAddress, approvedHolderAddress } = useSelector((state: any) => ({
    approvedBeneficiaryAddress: state.token.approvedBeneficiaryAddress,
    approvedHolderAddress: state.token.approvedHolderAddress,
  }));

  const isEqualBeneficiaryAndHolder = userRole === UserRole.HolderBeneficiary;
  const showHolder = userRole === UserRole.Holder || isEqualBeneficiaryAndHolder;
  const showBeneficiary = userRole === UserRole.Beneficiary && !isEqualBeneficiaryAndHolder;
  tokenSidebarError.accessDenied = userRole === UserRole.NoMatch;
  tokenSidebarError.networkMismatch = NETWORK_NAME.toLowerCase() !== network.toLowerCase();
  tokenSidebarError.metamaskNotFound = useWalletState.status === TransactionStateStatus.ERROR;

  trace(`config network: ${NETWORK_NAME} and metamask network: ${network}`);
  trace(`error in sidebar access ${JSON.stringify(tokenSidebarError)}`);
  const { call: getApprovedTitleEscrowAddress, value: approvedEscrowContractAddress } = useContractFunctionHook(
    titleEscrowInstance,
    "approvedTransferTarget"
  );
  const {
    send: changeHolder,
    transactionHash: changeHolderHash,
    errorMessage: changeHolderError,
  } = useContractFunctionHook(titleEscrowInstance, "changeHolder");
  const { send: transferTo, transactionHash: transferHash, errorMessage: transferError } = useContractFunctionHook(
    titleEscrowInstance,
    "transferTo"
  );

  useEffect(() => {
    getApprovedTitleEscrowAddress();
    const isApprovedAddress = approvedEscrowContractAddress && checkIfApprovedAddress(approvedEscrowContractAddress);
    if (isApprovedAddress) setApprovedBeneficiary(approvedBeneficiaryAddress);
    if (isApprovedAddress) setApprovedHolder(approvedHolderAddress);
  }, [approvedBeneficiaryAddress, approvedEscrowContractAddress, approvedHolderAddress, getApprovedTitleEscrowAddress]);

  const handleFormActions = async (fn: Function, actionType: TOKEN_ACTION_TYPES, value = "") => {
    try {
      setActionError(null);
      setActionType(actionType);
      toggleActionLoader(true);
      await fn(value);
      const hash = changeHolderHash || transferHash;
      trace(`transaction mined hash: ${hash}`);
      toggleActionLoader(false);
    } catch (e) {
      error(`handle action error ${JSON.stringify(e)}`);
      toggleActionLoader(false);
      setActionError({ type: actionType, message: e.message || e.reason });
    }
  };

  const deployEscrowContractAction = async () => {
    try {
      setActionError(null);
      toggleActionLoader(true);
      const contractAddress = approvedEscrowContractAddress
        ? approvedEscrowContractAddress
        : await deployEscrowContract({
            registryAddress,
            beneficiaryAddress: approvedBeneficiary,
            holderAddress: approvedHolder,
          });
      trace(`escrow contract address to mint ${contractAddress}`);
      toggleActionLoader(false);
      return contractAddress;
    } catch (e) {
      error(`handle action error ${JSON.stringify(e)}`);
      toggleActionLoader(false);
      setActionError({ type: TOKEN_ACTION_TYPES.CHANGE_BENEFICIARY, message: e.message || e.reason });
    }
  };

  const approveChangeBeneficiary = async () => {
    const contractAddress = await deployEscrowContractAction();
    handleFormActions(endorseTransfer, TOKEN_ACTION_TYPES.ENDORSE_BENEFICIARY, contractAddress);
  };

  const transferHoldership = async () => {
    handleFormActions(changeHolder, TOKEN_ACTION_TYPES.CHANGE_HOLDER, newHolder);
  };

  const changeBeneficiary = async () => {
    const contractAddress = await deployEscrowContractAction();
    handleFormActions(transferTo, TOKEN_ACTION_TYPES.CHANGE_BENEFICIARY, contractAddress);
  };

  const surrenderDocument = () => {
    handleFormActions(transferTo, TOKEN_ACTION_TYPES.SURRENDER_DOCUMENT, registryAddress);
  };
  const hash = changeHolderHash || transferHash;
  const txnError = changeHolderError || transferError;
  if (hash) {
    const message = getSuccessResponse(actionType);
    return <TokenTransactionSuccess hash={hash} message={message} />;
  }

  return (
    <>
      {showActionLoader && (
        <div className={css.overlay}>
          <div className="loader" />
        </div>
      )}
      <TokenSideBarNoMatch errorType={tokenSidebarError}>
        <>
          {showHolder && (
            <TokenSideBarHolder
              isEqualBeneficiaryAndHolder={isEqualBeneficiaryAndHolder}
              approvedBeneficiaryAddress={approvedBeneficiary}
              approvedHolderAddress={approvedHolder}
              newHolder={newHolder}
              setApprovedBeneficiary={setApprovedBeneficiary}
              setApprovedHolder={setApprovedHolder}
              setNewHolder={setNewHolder}
              transferHoldership={transferHoldership}
              changeBeneficiary={changeBeneficiary}
              surrenderDocument={surrenderDocument}
              error={actionError || (txnError ? { type: actionType, message: txnError } : null)}
            />
          )}
          {showBeneficiary && (
            <TokenSideBarBeneficiary
              setApprovedBeneficiary={setApprovedBeneficiary}
              setApprovedHolder={setApprovedHolder}
              approveChangeBeneficiary={approveChangeBeneficiary}
              approvedHolder={approvedHolder}
              approvedBeneficiary={approvedBeneficiary}
              error={actionError || (txnError ? { type: actionType, message: txnError } : null)}
            />
          )}
        </>
      </TokenSideBarNoMatch>
    </>
  );
};

export default TokenSideBarContent;
